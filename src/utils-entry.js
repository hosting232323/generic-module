// Entry "leggero" del pacchetto: solo funzioni pure, senza alcun componente
// Vue. A differenza di index.js, questo file (e tutto cio' che importa) non
// tocca mai vuetify o vue-router, cosi' chi vuole solo l'http client o le
// funzioni di login puo' installare il pacchetto senza avere Vuetify/Router
// come dipendenze del proprio progetto.
export { createHttpClient } from './utils/http.js';
export { default as validation } from './utils/validation.js';
export { default as fileUtils } from './utils/files.js';
export { login, registerUser, askChangePassword, googleLogin } from './utils/auth.js';
