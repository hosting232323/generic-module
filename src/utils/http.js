/* eslint-disable no-console */

import fileUtils from './files.js';

const createHttpClient = (config = {}) => {
  const {
    hostname: defaultHostname,
    authHeader = 'Token',
    getToken = () => localStorage.getItem('token'),
    setToken = () => {},
    router = undefined,
    allowedExtensions = fileUtils.defaultExtensions,
    refreshEndpoint = undefined,
    credentials = refreshEndpoint ? 'include' : 'same-origin',
    onError = (message) => alert(message),
    onSessionExpired = () => {
      alert('Sessione scaduta');
      if (router) router.push('/');
    }
  } = config;

  const createHeader = (session, file = false) => {
    let headers = {};
    if (file)
      headers['Accept'] = '*/*';
    else
      headers['Content-Type'] = 'application/json';
    if (session)
      headers[authHeader] = getToken();
    return headers;
  };

  // Access token scaduto -> il backend risponde 401. Proviamo a rinnovarlo una
  // volta col refresh token (cookie HttpOnly, viaggia con credentials), e in
  // caso di successo la richiesta originale viene ripetuta. Attivo solo quando
  // e' configurato refreshEndpoint: senza, il comportamento resta invariato.
  let refreshing = null;

  const refreshAccessToken = () => {
    if (!refreshing) {
      refreshing = fetch(`${defaultHostname}${refreshEndpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials
      }).then(response => response.ok ? response.json() : null)
        .then(data => {
          if (data && data.status === 'ok' && data.access_token) {
            setToken(data.access_token);
            return true;
          }
          return false;
        }).catch(() => false)
        .finally(() => { refreshing = null; });
    }
    return refreshing;
  };

  const executeFetch = (url, fetchOptions, session) => {
    return fetch(url, { ...fetchOptions, credentials }).then(response => {
      if (session && response.status === 401 && refreshEndpoint) {
        return refreshAccessToken().then(renewed => {
          if (!renewed)
            return response;
          const retryHeaders = { ...fetchOptions.headers, [authHeader]: getToken() };
          return fetch(url, { ...fetchOptions, headers: retryHeaders, credentials });
        });
      }
      return response;
    });
  };

  const sessionHandler = (data, func, session) => {
    if (session && data.status == 'session') {
      onSessionExpired(data);
    } else {
      if (data && data.new_token)
        setToken(data.new_token);
      if (func)
        func(data);
    }
  };

  const makeRequest = (endpoint, method = 'GET', options = {}, func = null) => {
    const {
      session = true,
      hostname = undefined,
      body = undefined,
      params = undefined
    } = options;

    const finalHostname = hostname || defaultHostname;
    const url = new URL(`${finalHostname}${endpoint}`);
    if (params)
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const fetchOptions = {
      method: method,
      headers: createHeader(session)
    };
    if (body !== undefined)
      fetchOptions.body = JSON.stringify(body);

    executeFetch(url, fetchOptions, session).then(response => {
      if (session && response.status === 401) {
        onSessionExpired({ status: 'session', message: 'Sessione scaduta' });
        return null;
      }
      if (!response.ok)
        throw new Error(`Errore nella risposta del server: ${response.status} - ${response.statusText}`);
      return response.json();
    }).then(data => {
      if (data)
        sessionHandler(data, func, session);
    }).catch(error => {
      console.error('Errore nella richiesta:', error);
    });
  };

  const isFilePart = (value) =>
    (typeof File !== 'undefined' && value instanceof File) ||
    (typeof Blob !== 'undefined' && value instanceof Blob);

  const extractFile = (value) => {
    if (isFilePart(value))
      return value;
    if (value && typeof value === 'object') {
      if (isFilePart(value.selectedFile))
        return value.selectedFile;
      if (isFilePart(value.selectedImage))
        return value.selectedImage;
    }
    return null;
  };

  const collectFiles = (key, value) => {
    if (Array.isArray(value)) {
      return value
        .map(item => extractFile(item))
        .filter(file => file)
        .map(file => ({ name: file.name || key, file }));
    }
    const file = extractFile(value);
    return file ? [{ name: key, file }] : [];
  };

  const uploadRequest = (endpoint, method = 'POST', options = {}, func = null) => {
    const {
      session = true,
      hostname = undefined,
      body = {},
      files = {},
      extensions = allowedExtensions
    } = options;

    const finalHostname = hostname || defaultHostname;
    const entries = Object.keys(files).flatMap(key => collectFiles(key, files[key]));

    const fileError = fileUtils.validateFiles(entries.map(entry => entry.file), extensions);
    if (fileError) {
      onError(fileError);
      if (func) func({ status: 'ko', message: fileError });
      return;
    }

    const formData = new FormData();
    formData.append('data', JSON.stringify(body));
    entries.forEach(entry => formData.append(entry.name, entry.file));

    executeFetch(`${finalHostname}${endpoint}`, {
      method: method,
      headers: createHeader(session, true),
      body: formData
    }, session).then(response => {
      if (session && response.status === 401) {
        onSessionExpired({ status: 'session', message: 'Sessione scaduta' });
        return null;
      }
      if (!response.ok)
        throw new Error(`Errore nella risposta del server: ${response.status} - ${response.statusText}`);
      return response.json();
    }).then(data => {
      if (data)
        sessionHandler(data, func, session);
    }).catch(error => {
      console.error('Errore nella richiesta:', error);
    });
  };

  const downloadRequest = (endpoint, method = 'GET', options = {}, func = null) => {
    const {
      session = true,
      hostname = undefined,
      body = undefined,
      params = undefined
    } = options;

    const finalHostname = hostname || defaultHostname;
    let url, fetchOptions;
    if (method == 'GET') {
      url = new URL(`${finalHostname}${endpoint}`);
      if (params)
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      fetchOptions = {
        method: 'GET',
        headers: createHeader(session)
      };
    } else {
      url = `${finalHostname}${endpoint}`;
      fetchOptions = {
        method: method,
        headers: createHeader(session),
        body: JSON.stringify(body)
      };
    }

    executeFetch(url, fetchOptions, session)
      .then(async response => {
        if (session && response.status === 401) {
          onSessionExpired({ status: 'session', message: 'Sessione scaduta' });
          throw new Error('Sessione scaduta');
        }
        if (!response.ok)
          throw new Error(`Server error: ${response.status}`);

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          sessionHandler(data, (d) => {
            if (d.status === 'ko')
              onError(d.message || 'Errore durante il download');
          }, session);
          throw new Error('Server returned JSON instead of a file');
        }

        return response.blob();
      }).then(blob => {
        const objectUrl = URL.createObjectURL(blob);
        const tab = window.open(objectUrl, '_blank');

        if (!tab) {
          const a = document.createElement('a');
          a.href = objectUrl;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }

        setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);
      }).catch(error => {
        console.error('Errore nel download:', error);
      }).finally(() => {
        if (func) func();
      });
  };

  return {
    hostname: defaultHostname,
    makeRequest,
    uploadRequest,
    downloadRequest
  };
};


export default createHttpClient();
export { createHttpClient };
