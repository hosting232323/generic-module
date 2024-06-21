const hostnameGenericBackend = import.meta.env.VITE_HOSTNAME_GENERICBACKED;
const hostnameFastSite = import.meta.env.VITE_HOSTNAME_FASTSITE;
const apiKey = import.meta.env.VITE_API_KEY;


const postRequest = (endpoint, body, func, method = 'POST', genericBackend = false) => {
  let headers = {'Content-Type': 'application/json'};
  if (genericBackend)
    headers['Authorization'] = apiKey
  fetch(`${hostnameGenericBackend}${endpoint}`, {
    method: method,
    headers: headers,
    body: JSON.stringify(body)
  }).then(response => {
    if (!response.ok)
      throw new Error(`Errore nella risposta del server: ${response.status} - ${response.statusText}`);
    return response.json();
  }).then(data => {
    func(data);
  }).catch(error => {
    console.error('Errore nella richiesta:', error);
  });
};


const getRequest = (endpoint, params, func, method = 'GET', genericBackend = false) => {
  let headers = {'Content-Type': 'application/json'};
  let url = undefined;
  if (genericBackend){
    headers['Authorization'] = apiKey;
    url = new URL(`${hostnameGenericBackend}${endpoint}`); 
  } 
  else
    url = new URL(`${hostnameFastSite}${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  
  console.log(fetch(url, {
    method: method,
    headers: {'Content-Type': 'application/json'}
  }).then(response => {
    if (!response.ok)
      throw new Error(`Errore nella risposta del server: ${response.status} - ${response.statusText}`);
    return response.json();
  }).then(data => {
    func(data);
  }).catch(error => {
    console.error('Errore nella richiesta:', error);
  }));
};



const postRequestGenericBE = (endpoint, body, func, method = 'POST', router = undefined) => {
  fetch(`${hostnameGenericBackend}${endpoint}`, {
    method: method,
    headers: createHeader(router),
    body: JSON.stringify(body)
  }).then(response => {
    if (!response.ok)
      throw new Error(`Errore nella risposta del server: ${response.status} - ${response.statusText}`);
    return response.json();
  }).then(data => {
    sessionHandler(data, func, router);
  }).catch(error => {
    console.error('Errore nella richiesta:', error);
  });
};

const postRequestFileGenericBE = (endpoint, file, func, method = 'POST', router = undefined) => {
  const formData = new FormData();
  formData.append('file', file);

  fetch(`${hostnameGenericBackend}${endpoint}`, {
    method: method,
    headers: createHeader(router, true),
    body: formData
  }).then(response => {
    if (!response.ok)
      throw new Error(`Errore nella risposta del server: ${response.status} - ${response.statusText}`);
    return response.json();
  }).then(data => {
    sessionHandler(data, func, router);
  }).catch(error => {
    console.error('Errore nella richiesta:', error);
  });
};


const getRequestGenericBE = (endpoint, params, func, method = 'GET', router = undefined) => {
  const url = new URL(`${hostnameGenericBackend}${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  fetch(url, {
    method: method,
    headers: createHeader(router)
  }).then(response => {
    if (!response.ok)
      throw new Error(`Errore nella risposta del server: ${response.status} - ${response.statusText}`);
    return response.json();
  }).then(data => {
    sessionHandler(data, func, router);
  }).catch(error => {
    console.error('Errore nella richiesta:', error);
  });
};


const createHeader = (router, file = false) => {
  let headers = {};
  if (file)
    headers['Accept'] = '*/*';
  else
    headers['Content-Type'] = 'application/json';
  if (router)
    headers['Authorization'] = apiKey;
    headers['Token'] = localStorage.getItem('token');
  return headers;
};


const sessionHandler = (data, func, router) => {
  if (data.status == 'session') {
    alert('Sessione scaduta');
    router.push('/');
  } else
    func(data);
};
export default {
  postRequest,
  getRequest,
  postRequestGenericBE,
  postRequestFileGenericBE,
  getRequestGenericBE
};

