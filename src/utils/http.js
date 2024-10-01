import axios from 'axios';

const hostnameGenericBackend = import.meta.env.VITE_HOSTNAME_GENERICBACKED;
const hostnameBrooking = import.meta.env.VITE_HOSTNAME_BROOKING;
const hostnameFastSite = import.meta.env.VITE_HOSTNAME_FASTSITE;
const usernameBrooking = import.meta.env.USERNAME_BROOKING;
const passwordBrooking = import.meta.env.PASSWORD_BROOKING;


const getRequest = (endpoint, params, func) => {
  const url = new URL(`${hostnameFastSite}${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
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


const postRequestGenericBE = (endpoint, body, func, method = 'POST', router = undefined) => {
  fetch(`${hostnameGenericBackend}${endpoint}`, {
    method: method,
    headers: createHeader(),
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
    headers: createHeader(true),
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
    headers: createHeader()
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

const obtainToken = (callback) => {
  postRequestBrooking('api/authentication/login/', {
    username_or_email: usernameBrooking,
    password: passwordBrooking
  }, (data) => {
    localStorage.setItem('bearer', data.access);
    callback(data.access);
  });
};

const getRequestBrooking = (endpoint, params = {}, func, method = 'GET', router = undefined) => {
  const token = localStorage.getItem('bearer');
  if (token) {
    executeGet(endpoint, token, params, func);
  } else {
    obtainToken((newToken) => {
      executeGet(endpoint, newToken, params, func);
    });
  }
};

const executeGet = (endpoint, token, params = {}, callback) => {
  const url = new URL(`${hostnameBrooking}${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  axios.get(url.href, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    callback(response.data);
  }).catch((error) => {
    console.error('Errore durante la richiesta GET:', error);
    throw new Error("Errore durante la chiamata HTTP: " + error.message);
  });
};

const postRequestBrooking = (endpoint, dto, callback, session = false, method = 'POST') => {
  let options = {
    headers: {}
  };
  if (session) {
    options.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  const axiosMethod = method.toLowerCase();
  axios[axiosMethod](hostnameBrooking + endpoint, dto, options)
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      console.error(`Errore durante la richiesta ${method}:`, error);
      throw new Error("Errore durante la chiamata HTTP: " + error.message);
    });
};

const createHeader = (file = false) => {
  let headers = {
    'Token': localStorage.getItem('token')
  };
  if (file)
    headers['Accept'] = '*/*';
  else
    headers['Content-Type'] = 'application/json';
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
  getRequest,
  postRequestGenericBE,
  postRequestFileGenericBE,
  getRequestGenericBE,
  getRequestBrooking
};
