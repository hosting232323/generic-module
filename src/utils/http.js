const hostnameGenericBackend = import.meta.env.VITE_HOSTNAME_GENERICBACKEND;

const postRequest = (endpoint, body, func, method = 'POST', router = undefined, hostname = undefined) => {
  const finalHostname = hostname || hostnameGenericBackend;
  fetch(`${finalHostname}${endpoint}`, {
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

const getRequest = (endpoint, params, func, method = 'GET', router = undefined, hostname = undefined) => {
  const finalHostname = hostname || hostnameGenericBackend;
  const url = new URL(`${finalHostname}${endpoint}`);
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
    Token: localStorage.getItem('token')
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
  postRequest,
  getRequest
};
