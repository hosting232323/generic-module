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
      func(data);
    }
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

  const downloadRequest = (endpoint, body, method = 'GET', session = true, loading = undefined, hostname = undefined) => {
    const finalHostname = hostname || defaultHostname;
    let url, options;
    if (method == 'GET') {
      url = new URL(`${finalHostname}${endpoint}`);
      Object.keys(body).forEach(key => url.searchParams.append(key, body[key]));
      options = {
        method: 'GET',
        headers: createHeader(session)
      };
    } else {
      url = `${finalHostname}${endpoint}`;
      options = {
        method: 'POST',
        headers: createHeader(session),
        body: JSON.stringify(body)
      };
    }

    fetch(url, options)
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
        if (loading) loading();
      });
  };

  return {
    hostname: defaultHostname,
    postRequest,
    getRequest,
    postRequestFile,
    downloadRequest
  };
};


export default createHttpClient();
export { createHttpClient };
