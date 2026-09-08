// Http Client
export { createHttpClient } from './utils/http.js';

// Validation
export { default as validation } from './utils/validation.js';

// Gestione Estensioni File
export { default as fileUtils } from './utils/files.js';

// Utenti e Login
export { default as Password } from './components/users/UserPassword.vue';
export { default as AuthManager } from './components/users/AuthManager.vue';

// Utenti e Login: funzioni pure (senza UI), per chi vuole una grafica custom
export { login, registerUser, askChangePassword, googleLogin } from './utils/auth.js';

// Add On: Chatty
export { default as ChattyBot } from './components/chatty/ChattyBot.vue';

// Autocompletamento Indirizzi (Google Places)
export { default as AddressAutocomplete } from './components/AddressAutocomplete.vue';

// Analytics: tracciamento GA4 con Measurement ID risolto a runtime da generic-be
export { createAnalytics, createAnalyticsPlugin } from './utils/analytics.js';

// Cookie banner (Klaro) agganciato al consenso di Google Analytics
export { createKlaroPlugin } from './utils/klaro.js';
export { default as CookieSettings } from './components/CookieSettings.vue';
