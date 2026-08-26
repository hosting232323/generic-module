import { describe, expect, it, vi } from 'vitest';

import { createHttpClient } from '@/utils/http.js';

const response = (status, data) => ({
  status,
  ok: status >= 200 && status < 300,
  statusText: '',
  json: async () => data
});

const deferred = () => {
  let resolve;
  const promise = new Promise(done => { resolve = done; });
  return { promise, resolve };
};

describe('makeRequest - refresh del token scaduto', () => {
  it('rinnova il token scaduto e ripete la richiesta con quello nuovo', async () => {
    let token = 'expired-token';
    const calls = [];

    global.fetch = vi.fn(async (url, options) => {
      calls.push({ url: String(url), options });
      if (String(url).endsWith('/refresh'))
        return response(200, { status: 'ok', access_token: 'fresh-token' });
      if (calls.filter(call => call.url.endsWith('/resource')).length === 1)
        return response(401, { status: 'session' });
      return response(200, { status: 'ok' });
    });

    const client = createHttpClient({
      hostname: 'https://api.example',
      refreshEndpoint: '/refresh',
      getToken: () => token,
      setToken: value => { token = value; }
    });
    await new Promise(resolve => client.makeRequest('/resource', 'GET', {}, resolve));

    const refreshCall = calls.find(call => call.url.endsWith('/refresh'));
    const retryCall = calls.filter(call => call.url.endsWith('/resource'))[1];
    expect(refreshCall.options.headers.Token).toBe('expired-token');
    expect(retryCall.options.headers.Token).toBe('fresh-token');
  });

  it('una 401 in ritardo ripete con il token gia\' rinnovato da un\'altra richiesta', async () => {
    let token = 'expired-token';
    let refreshCalls = 0;
    let resourceCalls = 0;
    const firstResponses = [deferred(), deferred()];

    global.fetch = vi.fn(async (url) => {
      if (String(url).endsWith('/refresh')) {
        refreshCalls += 1;
        return response(200, { status: 'ok', access_token: 'fresh-token' });
      }
      resourceCalls += 1;
      if (resourceCalls <= 2)
        return firstResponses[resourceCalls - 1].promise;
      return response(200, { status: 'ok' });
    });

    const client = createHttpClient({
      hostname: 'https://api.example',
      refreshEndpoint: '/refresh',
      getToken: () => token,
      setToken: value => { token = value; }
    });
    const first = new Promise(resolve => client.makeRequest('/resource', 'GET', {}, resolve));
    const second = new Promise(resolve => client.makeRequest('/resource', 'GET', {}, resolve));

    firstResponses[0].resolve(response(401, { status: 'session' }));
    await first;
    firstResponses[1].resolve(response(401, { status: 'session' }));
    await second;

    expect(refreshCalls).toBe(1);
    expect(resourceCalls).toBe(4);
  });

  it('se il refresh fallisce chiude la sessione e azzera il token', async () => {
    let token = 'expired-token';
    const onSessionExpired = vi.fn();

    global.fetch = vi.fn(async (url) => {
      if (String(url).endsWith('/refresh'))
        return response(200, { status: 'ko' });
      return response(401, { status: 'session' });
    });

    const client = createHttpClient({
      hostname: 'https://api.example',
      refreshEndpoint: '/refresh',
      getToken: () => token,
      setToken: value => { token = value; },
      onSessionExpired
    });
    // Alla scadenza sessione makeRequest non richiama func: si osserva l'esito
    // tramite onSessionExpired.
    client.makeRequest('/resource', 'GET', {}, vi.fn());
    await vi.waitFor(() => expect(onSessionExpired).toHaveBeenCalledOnce());

    expect(token).toBe('');
  });

  it('alla scadenza sessione, con logoutEndpoint configurato, revoca lato server', async () => {
    const calls = [];
    global.fetch = vi.fn(async (url) => {
      calls.push(String(url));
      if (String(url).endsWith('/logout'))
        return response(200, { status: 'ok' });
      return response(401, { status: 'session' });
    });

    const client = createHttpClient({
      hostname: 'https://api.example',
      logoutEndpoint: '/logout',
      getToken: () => 'a-token',
      setToken: vi.fn(),
      onSessionExpired: vi.fn()
    });
    client.makeRequest('/resource', 'GET', {}, vi.fn());
    await vi.waitFor(() => expect(calls).toContain('https://api.example/logout'));
  });

  it('se il refresh non risponde, considera il rinnovo fallito e chiude la sessione', async () => {
    const onSessionExpired = vi.fn();
    global.fetch = vi.fn(async (url) => {
      if (String(url).endsWith('/refresh'))
        return Promise.reject(new Error('rete assente'));
      return response(401, { status: 'session' });
    });

    const client = createHttpClient({
      hostname: 'https://api.example',
      refreshEndpoint: '/refresh',
      getToken: () => 'expired-token',
      setToken: vi.fn(),
      onSessionExpired
    });
    client.makeRequest('/resource', 'GET', {}, vi.fn());

    await vi.waitFor(() => expect(onSessionExpired).toHaveBeenCalledOnce());
  });

  it('con status "session" nel body di una risposta 200, chiude comunque la sessione', async () => {
    global.fetch = vi.fn(async () => response(200, { status: 'session' }));
    const onSessionExpired = vi.fn();
    const setToken = vi.fn();
    const client = createHttpClient({
      hostname: 'https://api.example', getToken: () => 'token', setToken, onSessionExpired
    });

    client.makeRequest('/resource', 'GET', {}, vi.fn());

    await vi.waitFor(() => expect(onSessionExpired).toHaveBeenCalledOnce());
    expect(setToken).toHaveBeenCalledWith('');
  });

  it('usa i default di configurazione (getToken/onError/onSessionExpired) quando non specificati', async () => {
    localStorage.setItem('token', 'stored-token');
    let capturedToken;
    global.fetch = vi.fn(async (url, options) => {
      capturedToken = options.headers.Token;
      return response(401, { status: 'session' });
    });

    const client = createHttpClient({ hostname: 'https://api.example' });
    client.makeRequest('/resource', 'GET', {}, vi.fn());

    await vi.waitFor(() => expect(global.alert).toHaveBeenCalledWith('Sessione scaduta'));
    expect(capturedToken).toBe('stored-token');
    localStorage.removeItem('token');
  });

  it('con un router configurato, reindirizza alla home alla scadenza sessione', async () => {
    global.fetch = vi.fn(async () => response(401, { status: 'session' }));
    const router = { push: vi.fn() };
    const client = createHttpClient({ hostname: 'https://api.example', getToken: () => 'token', router });

    client.makeRequest('/resource', 'GET', {}, vi.fn());

    await vi.waitFor(() => expect(router.push).toHaveBeenCalledWith('/'));
  });
});

describe('makeRequest - richieste normali', () => {
  it('richiama func con i dati quando la risposta e\' ok', async () => {
    global.fetch = vi.fn(async () => response(200, { status: 'ok', value: 42 }));
    const client = createHttpClient({ hostname: 'https://api.example', getToken: () => 'token' });

    const data = await new Promise(resolve => client.makeRequest('/resource', 'GET', {}, resolve));

    expect(data).toEqual({ status: 'ok', value: 42 });
  });

  it('senza session, ignora uno status "session" e richiama comunque func', async () => {
    global.fetch = vi.fn(async () => response(200, { status: 'session', value: 1 }));
    const onSessionExpired = vi.fn();
    const client = createHttpClient({ hostname: 'https://api.example', onSessionExpired });

    const data = await new Promise(resolve =>
      client.makeRequest('/public', 'GET', { session: false }, resolve));

    expect(data).toEqual({ status: 'session', value: 1 });
    expect(onSessionExpired).not.toHaveBeenCalled();
  });

  it('con una risposta di errore non richiama func', async () => {
    global.fetch = vi.fn(async () => response(500, {}));
    const func = vi.fn();
    const client = createHttpClient({ hostname: 'https://api.example', getToken: () => 'token' });

    client.makeRequest('/resource', 'GET', {}, func);
    await vi.waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(func).not.toHaveBeenCalled();
  });

  it('aggiunge params alla query string e serializza il body', async () => {
    let capturedUrl, capturedOptions;
    global.fetch = vi.fn(async (url, options) => {
      capturedUrl = url;
      capturedOptions = options;
      return response(200, { status: 'ok' });
    });
    const client = createHttpClient({ hostname: 'https://api.example', getToken: () => 'token' });

    await new Promise(resolve => client.makeRequest('/resource', 'POST', {
      params: { page: 2 },
      body: { title: 'test' }
    }, resolve));

    expect(String(capturedUrl)).toBe('https://api.example/resource?page=2');
    expect(capturedOptions.body).toBe(JSON.stringify({ title: 'test' }));
  });

  it('aggiorna il token quando il server ne restituisce uno nuovo nel payload', async () => {
    global.fetch = vi.fn(async () => response(200, { status: 'ok', new_token: 'rotated-token' }));
    const setToken = vi.fn();
    const client = createHttpClient({ hostname: 'https://api.example', getToken: () => 'token', setToken });

    await new Promise(resolve => client.makeRequest('/resource', 'GET', {}, resolve));

    expect(setToken).toHaveBeenCalledWith('rotated-token');
  });
});

describe('uploadRequest', () => {
  it('rifiuta un\'estensione non ammessa senza contattare il server', async () => {
    global.fetch = vi.fn();
    const onError = vi.fn();
    const func = vi.fn();
    const client = createHttpClient({ hostname: 'https://api.example', getToken: () => 'token', onError });

    const file = new File(['x'], 'malware.exe', { type: 'application/octet-stream' });
    client.uploadRequest('/upload', 'POST', { files: { document: file } }, func);
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(global.fetch).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledOnce();
    expect(func).toHaveBeenCalledWith(expect.objectContaining({ status: 'ko' }));
  });

  it('invia i file ammessi in un FormData insieme al body', async () => {
    let capturedBody;
    global.fetch = vi.fn(async (url, options) => {
      capturedBody = options.body;
      return response(200, { status: 'ok' });
    });
    const client = createHttpClient({ hostname: 'https://api.example', getToken: () => 'token' });

    const file = new File(['x'], 'photo.png', { type: 'image/png' });
    const func = vi.fn();
    client.uploadRequest('/upload', 'POST', { body: { title: 'test' }, files: { document: file } }, func);
    await vi.waitFor(() => expect(func).toHaveBeenCalled());

    expect(capturedBody).toBeInstanceOf(FormData);
    expect(capturedBody.get('document')).toBe(file);
    expect(JSON.parse(capturedBody.get('data'))).toEqual({ title: 'test' });
  });

  it('alla scadenza sessione non richiama func', async () => {
    global.fetch = vi.fn(async () => response(401, { status: 'session' }));
    const onSessionExpired = vi.fn();
    const func = vi.fn();
    const client = createHttpClient({ hostname: 'https://api.example', getToken: () => 'token', onSessionExpired });

    client.uploadRequest('/upload', 'POST', { files: {} }, func);
    await vi.waitFor(() => expect(onSessionExpired).toHaveBeenCalledOnce());

    expect(func).not.toHaveBeenCalled();
  });

  it('con una risposta di errore non richiama func', async () => {
    global.fetch = vi.fn(async () => response(500, {}));
    const func = vi.fn();
    const client = createHttpClient({ hostname: 'https://api.example', getToken: () => 'token' });

    client.uploadRequest('/upload', 'POST', { files: {} }, func);
    await vi.waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(func).not.toHaveBeenCalled();
  });

  it('estrae i file da un array di elementi e da campi selectedFile/selectedImage', async () => {
    let capturedBody;
    global.fetch = vi.fn(async (url, options) => {
      capturedBody = options.body;
      return response(200, { status: 'ok' });
    });
    const client = createHttpClient({ hostname: 'https://api.example', getToken: () => 'token' });

    const photo1 = new File(['a'], 'a.png', { type: 'image/png' });
    const photo2 = new File(['b'], 'b.png', { type: 'image/png' });
    const avatar = new File(['c'], 'c.png', { type: 'image/png' });
    const func = vi.fn();
    client.uploadRequest('/upload', 'POST', {
      files: {
        gallery: [photo1, { selectedImage: photo2 }, { selectedFile: null }],
        avatar: { selectedFile: avatar }
      }
    }, func);
    await vi.waitFor(() => expect(func).toHaveBeenCalled());

    expect(capturedBody.get('a.png')).toBe(photo1);
    expect(capturedBody.get('b.png')).toBe(photo2);
    expect(capturedBody.get('avatar')).toBe(avatar);
  });
});

describe('downloadRequest', () => {
  it('apre il blob in una nuova scheda quando il browser lo consente', async () => {
    const blob = new Blob(['contenuto']);
    global.fetch = vi.fn(async () => ({
      status: 200,
      ok: true,
      headers: { get: () => 'application/pdf' },
      blob: async () => blob
    }));
    const openSpy = vi.spyOn(window, 'open').mockReturnValue({});
    const func = vi.fn();
    const client = createHttpClient({ hostname: 'https://api.example', getToken: () => 'token' });

    client.downloadRequest('/export', 'GET', {}, func);
    await vi.waitFor(() => expect(func).toHaveBeenCalled());

    expect(openSpy).toHaveBeenCalledWith(expect.stringContaining('blob:'), '_blank');
  });

  it('se il browser blocca il popup, scarica tramite un link generato al volo', async () => {
    const blob = new Blob(['contenuto']);
    global.fetch = vi.fn(async () => ({
      status: 200,
      ok: true,
      headers: { get: () => 'application/pdf' },
      blob: async () => blob
    }));
    vi.spyOn(window, 'open').mockReturnValue(null);
    const anchor = document.createElement('a');
    const clickSpy = vi.spyOn(anchor, 'click').mockImplementation(() => {});
    const createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue(anchor);
    const func = vi.fn();
    const client = createHttpClient({ hostname: 'https://api.example', getToken: () => 'token' });

    client.downloadRequest('/export', 'GET', {}, func);
    await vi.waitFor(() => expect(func).toHaveBeenCalled());

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(clickSpy).toHaveBeenCalledOnce();
  });

  it('se il server risponde con json invece del file, segnala l\'errore', async () => {
    global.fetch = vi.fn(async () => ({
      status: 200,
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => ({ status: 'ko', message: 'Esportazione non disponibile' })
    }));
    const onError = vi.fn();
    const func = vi.fn();
    const client = createHttpClient({ hostname: 'https://api.example', getToken: () => 'token', onError });

    client.downloadRequest('/export', 'GET', {}, func);
    await vi.waitFor(() => expect(func).toHaveBeenCalled());

    expect(onError).toHaveBeenCalledWith('Esportazione non disponibile');
  });

  it('alla scadenza sessione chiama comunque func nel finally', async () => {
    global.fetch = vi.fn(async () => response(401, { status: 'session' }));
    const onSessionExpired = vi.fn();
    const func = vi.fn();
    const client = createHttpClient({ hostname: 'https://api.example', getToken: () => 'token', onSessionExpired });

    client.downloadRequest('/export', 'GET', {}, func);

    await vi.waitFor(() => expect(func).toHaveBeenCalled());
    expect(onSessionExpired).toHaveBeenCalledOnce();
  });

  it('con una risposta di errore chiama comunque func nel finally', async () => {
    global.fetch = vi.fn(async () => response(500, {}));
    const func = vi.fn();
    const client = createHttpClient({ hostname: 'https://api.example', getToken: () => 'token' });

    client.downloadRequest('/export', 'GET', {}, func);

    await vi.waitFor(() => expect(func).toHaveBeenCalled());
  });

  it('con un metodo diverso da GET invia il body come json', async () => {
    let capturedOptions;
    global.fetch = vi.fn(async (url, options) => {
      capturedOptions = options;
      return {
        status: 200,
        ok: true,
        headers: { get: () => 'application/pdf' },
        blob: async () => new Blob(['x'])
      };
    });
    vi.spyOn(window, 'open').mockReturnValue({});
    const func = vi.fn();
    const client = createHttpClient({ hostname: 'https://api.example', getToken: () => 'token' });

    client.downloadRequest('/export', 'POST', { body: { format: 'csv' } }, func);
    await vi.waitFor(() => expect(func).toHaveBeenCalled());

    expect(capturedOptions.body).toBe(JSON.stringify({ format: 'csv' }));
  });

  it('con un metodo GET aggiunge i params alla query string', async () => {
    let capturedUrl;
    global.fetch = vi.fn(async (url) => {
      capturedUrl = url;
      return {
        status: 200,
        ok: true,
        headers: { get: () => 'application/pdf' },
        blob: async () => new Blob(['x'])
      };
    });
    vi.spyOn(window, 'open').mockReturnValue({});
    const func = vi.fn();
    const client = createHttpClient({ hostname: 'https://api.example', getToken: () => 'token' });

    client.downloadRequest('/export', 'GET', { params: { format: 'csv' } }, func);
    await vi.waitFor(() => expect(func).toHaveBeenCalled());

    expect(String(capturedUrl)).toBe('https://api.example/export?format=csv');
  });

  it('revoca l\'object url dopo il timeout', async () => {
    vi.useFakeTimers();
    global.fetch = vi.fn(async () => ({
      status: 200,
      ok: true,
      headers: { get: () => 'application/pdf' },
      blob: async () => new Blob(['x'])
    }));
    vi.spyOn(window, 'open').mockReturnValue({});
    const revokeSpy = vi.spyOn(URL, 'revokeObjectURL');
    const client = createHttpClient({ hostname: 'https://api.example', getToken: () => 'token' });

    client.downloadRequest('/export', 'GET', {}, vi.fn());
    await vi.advanceTimersByTimeAsync(10000);

    expect(revokeSpy).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
