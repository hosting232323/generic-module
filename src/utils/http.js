const hostnameGenericBackend = import.meta.env.VITE_HOSTNAME_GENERICBACKED;
const hostnameFastSite = import.meta.env.VITE_HOSTNAME_FASTSITE;
const hostnameBooking = import.meta.env.VITE_HOSTNAME_BOOKING;  


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

const getRequestBooking = (endpoint, params, func, method = 'GET', router = undefined, file = false) => {
  const url = new URL(`${hostnameBooking}${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  fetch(url, {
    method: method,
    headers: createHeader(router),
  }).then(response => {
    if (response.status === 404) {
      console.error('Endpoint not found: 404');
      return;
    }
    if (!response.ok)
      throw new Error(`Errore nella risposta del server: ${response.status} - ${response.statusText}`);
    return (file) ? response.json() : response.blob();
  }).then(data => {
    sessionHandler(data, func, router);
  }).catch(error => {
    console.error('Errore nella richiesta:', error);
  });
};

const postRequestBooking = (endpoint, body, func, method = 'POST', router = undefined) => {
  fetch(`${hostnameBooking}${endpoint}`, {
    method: method,
    headers: createHeader(router),
    body: JSON.stringify(body),
  }).then(response => {
    if (response.status === 404) {
      console.error('Endpoint not found: 404');
      return;
    }
    if (!response.ok)
      throw new Error(`Errore nella risposta del server: ${response.status} - ${response.statusText}`);
    return response.json();
  }).then(data => {
    sessionHandler(data, func, router);
  }).catch(error => {
    console.error('Errore nella richiesta:', error);
  });
};


export default {
  getRequest,
  postRequestGenericBE,
  postRequestFileGenericBE,
  getRequestGenericBE,
  getRequestBooking,
  postRequestBooking
};
