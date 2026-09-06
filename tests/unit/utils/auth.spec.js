import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import auth, { askChangePassword, googleLogin, login, registerUser } from '@/utils/auth.js';

const makeClient = () => ({ makeRequest: vi.fn() });

describe('login / registerUser / askChangePassword', () => {
  it('login: POST sull\'endpoint di default con body e callback', () => {
    const client = makeClient();
    const callback = vi.fn();

    login(client, { body: { username: 'mario', password: 'segreta' } }, callback);

    expect(client.makeRequest).toHaveBeenCalledWith(
      'user/login', 'POST', { body: { username: 'mario', password: 'segreta' } }, callback
    );
  });

  it('registerUser: endpoint di default user/register-user', () => {
    const client = makeClient();

    registerUser(client, { body: { email: 'mario@example.com' } });

    expect(client.makeRequest).toHaveBeenCalledWith(
      'user/register-user', 'POST', { body: { email: 'mario@example.com' } }, undefined
    );
  });

  it('askChangePassword: endpoint di default user/ask-change-password', () => {
    const client = makeClient();

    askChangePassword(client, { body: { email: 'mario@example.com' } });

    expect(client.makeRequest).toHaveBeenCalledWith(
      'user/ask-change-password', 'POST', { body: { email: 'mario@example.com' } }, undefined
    );
  });

  it('endpoint sovrascrivibile per backend con naming diverso', () => {
    const client = makeClient();

    login(client, { body: {}, endpoint: 'auth/signin' });

    expect(client.makeRequest).toHaveBeenCalledWith('auth/signin', 'POST', { body: {} }, undefined);
  });

  it('inoltra le opzioni extra (hostname, session) a makeRequest', () => {
    const client = makeClient();

    login(client, { body: { u: 1 }, hostname: 'https://api.example', session: false });

    expect(client.makeRequest).toHaveBeenCalledWith(
      'user/login', 'POST', { body: { u: 1 }, hostname: 'https://api.example', session: false }, undefined
    );
  });

  it('chiamata col solo client: non solleva e usa i default', () => {
    const client = makeClient();

    expect(() => login(client)).not.toThrow();
    expect(client.makeRequest).toHaveBeenCalledWith('user/login', 'POST', { body: undefined }, undefined);
  });

  it('le stesse funzioni sono disponibili come export default', () => {
    expect(auth.login).toBe(login);
    expect(auth.registerUser).toBe(registerUser);
    expect(auth.askChangePassword).toBe(askChangePassword);
    expect(auth.googleLogin).toBe(googleLogin);
  });
});

describe('googleLogin', () => {
  let appended;
  let appendSpy;

  beforeEach(() => {
    vi.resetModules();
    appended = [];
    appendSpy = vi.spyOn(document.body, 'appendChild').mockImplementation((node) => {
      appended.push(node);
      if (typeof node.onload === 'function') node.onload();
      return node;
    });
    global.google = { accounts: { id: { initialize: vi.fn(), prompt: vi.fn() } } };
  });

  afterEach(() => {
    appendSpy.mockRestore();
    delete global.google;
  });

  const gisCallback = () => global.google.accounts.id.initialize.mock.calls[0][0].callback;

  it('carica lo script GIS, inizializza col client id e mostra il prompt', async () => {
    const { googleLogin: gl } = await import('@/utils/auth.js');

    gl(makeClient(), { googleClientId: 'client-123' });

    await vi.waitFor(() => expect(global.google.accounts.id.initialize).toHaveBeenCalled());
    expect(appended[0].src).toBe('https://accounts.google.com/gsi/client');
    expect(global.google.accounts.id.initialize).toHaveBeenCalledWith(
      expect.objectContaining({ client_id: 'client-123' })
    );
    expect(global.google.accounts.id.prompt).toHaveBeenCalledOnce();
  });

  it('alla risposta di Google inoltra il credential a user/google-login', async () => {
    const { googleLogin: gl } = await import('@/utils/auth.js');
    const client = makeClient();
    const callback = vi.fn();

    gl(client, { googleClientId: 'client-123' }, callback);
    await vi.waitFor(() => expect(global.google.accounts.id.initialize).toHaveBeenCalled());

    gisCallback()({ credential: 'jwt-di-google' });

    expect(client.makeRequest).toHaveBeenCalledWith(
      'user/google-login', 'POST', { body: { token: 'jwt-di-google' } }, callback
    );
  });

  it('endpoint sovrascrivibile e opzioni extra inoltrate (non googleClientId)', async () => {
    const { googleLogin: gl } = await import('@/utils/auth.js');
    const client = makeClient();

    gl(client, { googleClientId: 'c', endpoint: 'auth/google', hostname: 'https://api.example' });
    await vi.waitFor(() => expect(global.google.accounts.id.initialize).toHaveBeenCalled());

    gisCallback()({ credential: 'tok' });

    expect(client.makeRequest).toHaveBeenCalledWith(
      'auth/google', 'POST', { body: { token: 'tok' }, hostname: 'https://api.example' }, undefined
    );
  });

  it('lo script GIS viene aggiunto una sola volta su chiamate ripetute', async () => {
    const { googleLogin: gl } = await import('@/utils/auth.js');

    gl(makeClient(), { googleClientId: 'c' });
    await vi.waitFor(() => expect(global.google.accounts.id.initialize).toHaveBeenCalledTimes(1));
    gl(makeClient(), { googleClientId: 'c' });
    await vi.waitFor(() => expect(global.google.accounts.id.initialize).toHaveBeenCalledTimes(2));

    const gisScripts = appended.filter((node) => node.src === 'https://accounts.google.com/gsi/client');
    expect(gisScripts).toHaveLength(1);
  });
});
