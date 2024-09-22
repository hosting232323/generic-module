
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import functionalities from '../views/Functionalities.json';
import axios from 'axios';

const hostnameGenericBackend = import.meta.env.VITE_HOSTNAME_GENERICBACKED;
const hostnameBrooking = import.meta.env.VITE_HOSTNAME_BROOKING;
const hostnameFastSite = import.meta.env.VITE_HOSTNAME_FASTSITE;

const initializeStore = () => {
  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);
  return data.value.store;
}

const getRequest = (endpoint, params, func) => {
  const url = new URL(`${hostnameFastSite}${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  
  fetch(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
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


const postRequestFileGenericBE = (endpoint, file, func, method = 'POST',router = undefined) => {
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


const getRequestGenericBE = (endpoint, params, func,method='GET',router = undefined) => {
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

const executeGetRequestBrooking = (endpoint, token, params = {}, callback) => {
  const url = new URL(`${hostnameBrooking}${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  axios.get(url.href, {
    headers: {
      Authorization: `Token ${token}`
    }
  }).then((response) => {
    callback(response.data);
  }).catch((error) => {
    console.error('Errore durante la richiesta GET:', error);
    throw new Error("Errore durante la chiamata HTTP: " + error.message);
  });
};

const executePostRequestBrooking = (endpoint, dto, callback, method = 'POST', login = true) => {
  console.log("Chiamata a executePostRequestBrooking con endpoint:", endpoint, "DTO:", dto);

  const axiosMethod = method.toLowerCase();
  axios[axiosMethod](hostnameBrooking + endpoint, dto, {})
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      console.error(`Errore durante la richiesta ${method}:`, error.response ? error.response.data : error.message);
      throw new Error("Errore durante la chiamata HTTP: " + error.message);
    });
    console.log("URL della richiesta:", hostnameBrooking + endpoint);
  };

const createHeader = (file = false) => {
  let headers = {
    'Authorization': localStorage.getItem('token')
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
    router.push('/login');
  } else
    func(data);
};


export default {
  getRequest,
  postRequestGenericBE,
  postRequestFileGenericBE,
  getRequestGenericBE,
  executePostRequestBrooking
};
