/* eslint-disable no-console */

const viteHostname = import.meta.env.VITE_HOSTNAME;

const createHttpClient = (config = {}) => {
  const {
    hostname: defaultHostname = viteHostname,
    authHeader = 'Token',
    getToken = () => localStorage.getItem('token'),
    setToken = () => {},
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

    fetch(url, fetchOptions).then(response => {
      if (!response.ok)
        throw new Error(`Errore nella risposta del server: ${response.status} - ${response.statusText}`);
      return response.json();
    }).then(data => {
      sessionHandler(data, func, session);
    }).catch(error => {
      console.error('Errore nella richiesta:', error);
    });
  };

  const uploadRequest = (endpoint, method = 'POST', options = {}, func = null) => {
    const {
      session = true,
      hostname = undefined,
      body = {}
    } = options;

    const finalHostname = hostname || defaultHostname;
    const formData = new FormData();
    Object.keys(body).forEach(key => formData.append(key, body[key]));

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

    fetch(url, fetchOptions)
      .then(async response => {
        if (!response.ok)
          throw new Error(`Server error: ${response.status}`);

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          sessionHandler(data, (d) => {
            if (d.status === 'ko')
              alert(d.message || 'Errore durante il download');
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
