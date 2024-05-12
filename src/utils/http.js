const hostnameGenericBackend = import.meta.env.VITE_HOSTNAME_GENERICBACKED;
const hostnameSellerDashboard = import.meta.env.VITE_HOSTNAME_FASTSITE;
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


const getRequest = (endpoint, params, func, method = 'GET') => {
  const url = new URL(`${hostnameSellerDashboard}${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  fetch(url, {
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
  });
};


export default {
  postRequest,
  getRequest
};
