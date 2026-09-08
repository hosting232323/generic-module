// Funzioni di autenticazione pure, senza UI: chi le usa passa il proprio
// httpClient (creato con createHttpClient) e ci costruisce sopra la propria
// grafica custom. Gli endpoint di default seguono la convenzione generic-be
// (user/login, user/register-user, ...) e sono sovrascrivibili per backend
// che usano nomi diversi.

const login = (httpClient, { body, endpoint = 'user/login', ...options } = {}, callback) => {
  httpClient.makeRequest(endpoint, 'POST', { body, ...options }, callback);
};

const registerUser = (httpClient, { body, endpoint = 'user/register-user', ...options } = {}, callback) => {
  httpClient.makeRequest(endpoint, 'POST', { body, ...options }, callback);
};

const askChangePassword = (httpClient, { body, endpoint = 'user/ask-change-password', ...options } = {}, callback) => {
  httpClient.makeRequest(endpoint, 'POST', { body, ...options }, callback);
};

// Lo script del Google Identity Services viene caricato una sola volta, alla
// prima chiamata di googleLogin: prima non serve, e chi non usa il login
// Google non lo scarica mai.
let googleScriptPromise = null;
const loadGoogleScript = () => {
  if (!googleScriptPromise) {
    googleScriptPromise = new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      document.body.appendChild(script);
    });
  }
  return googleScriptPromise;
};

const googleLogin = (httpClient, { googleClientId, endpoint = 'user/google-login', ...options } = {}, callback) => {
  loadGoogleScript().then(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: googleClientId,
      callback: (response) => {
        httpClient.makeRequest(endpoint, 'POST', {
          body: { token: response.credential },
          ...options
        }, callback);
      }
    });
    google.accounts.id.prompt();
  });
};

export default { login, registerUser, askChangePassword, googleLogin };
export { login, registerUser, askChangePassword, googleLogin };
