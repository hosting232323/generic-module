/* eslint-disable no-console */

const viteHostname = import.meta.env.VITE_HOSTNAME;

const createHttpClient = (config = {}) => {
  const {
    hostname: defaultHostname = viteHostname,
    authHeader = 'Token',
    getToken = () => localStorage.getItem('token'),
    router = undefined,
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

  const sessionHandler = (data, func, session) => {
    if (session && data.status == 'session')
      onSessionExpired();
    else
      func(data);
  };

  const postRequest = (endpoint, body, func, method = 'POST', session = true, hostname = undefined) => {
    const finalHostname = hostname || defaultHostname;
    fetch(`${finalHostname}${endpoint}`, {
      method: method,
      headers: createHeader(session),
      body: JSON.stringify(body)
    }).then(response => {
      if (!response.ok)
        throw new Error(`Errore nella risposta del server: ${response.status} - ${response.statusText}`);
      return response.json();
    }).then(data => {
      sessionHandler(data, func, session);
    }).catch(error => {
      console.error('Errore nella richiesta:', error);
    });
  };

  const getRequest = (endpoint, params, func, method = 'GET', session = true, hostname = undefined) => {
    const finalHostname = hostname || defaultHostname;
    const url = new URL(`${finalHostname}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    fetch(url, {
      method: method,
      headers: createHeader(session)
    }).then(response => {
      if (!response.ok)
        throw new Error(`Errore nella risposta del server: ${response.status} - ${response.statusText}`);
      return response.json();
    }).then(data => {
      sessionHandler(data, func, session);
    }).catch(error => {
      console.error('Errore nella richiesta:', error);
    });
  };

  const postRequestFile = (endpoint, data, func, method = 'POST', session = true, hostname = undefined) => {
    const finalHostname = hostname || defaultHostname;
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));

    fetch(`${finalHostname}${endpoint}`, {
      method: method,
      headers: createHeader(session, true),
      body: formData
    }).then(response => {
      if (!response.ok)
        throw new Error(`Errore nella risposta del server: ${response.status} - ${response.statusText}`);
      return response.json();
    }).then(data => {
      sessionHandler(data, func, session);
    }).catch(error => {
      console.error('Errore nella richiesta:', error);
    });
  };

  return {
    hostname: defaultHostname,
    postRequest,
    getRequest,
    postRequestFile
  };
};


export default createHttpClient();
export { createHttpClient };
