# generic-module

Modulo Vue 3 condiviso tra i progetti frontend. Espone un client HTTP, le regole di
validazione per i form, i componenti di autenticazione e l'add-on ChattyBot.
**Non è un'applicazione**: non ha router, viste, layout o build applicativa.

## Installazione

```bash
npm install git+https://github.com/hosting232323/generic-module.git
```

Le dipendenze `vue`, `vue-router`, `pinia` e `vuetify` sono peer dependencies:
devono essere fornite dal progetto ospite.

Il modulo importa i componenti Vuetify direttamente da `vuetify/components/*`
(risolti dalla copia di Vuetify del progetto ospite), quindi funziona sia con
`autoImport` sia con la registrazione globale. I font delle icone **non** sono
inclusi: il progetto ospite deve importare `@mdi/font` per conto suo, tipicamente
in `src/plugins/vuetify.js`:

```js
import '@mdi/font/css/materialdesignicons.css';
```

## API pubblica

Tutto ciò che il modulo espone è dichiarato in [src/index.js](src/index.js).
Nient'altro è da considerarsi utilizzabile dall'esterno.

### Http Client

```js
import { createHttpClient } from 'generic-module';
import router from '@/plugins/router';

const client = createHttpClient({
  hostname: import.meta.env.VITE_HOSTNAME,
  authHeader: 'Authorization',
  router,
  getToken: () => localStorage.getItem('token'),
  setToken: (token) => localStorage.setItem('token', token),
  onSessionExpired: (data) => { /* ... */ }
});
```

Opzioni di `createHttpClient` (tutte facoltative tranne `hostname`):

| Opzione | Default | Descrizione |
| --- | --- | --- |
| `hostname` | — | Base URL delle API. **Va sempre passato dal progetto ospite** (il modulo non legge nessun env: `import.meta.env` verrebbe risolto alla build del modulo, non dell'app). |
| `authHeader` | `'Token'` | Nome dell'header di autenticazione. |
| `getToken` | legge `localStorage.token` | Come recuperare il token. |
| `setToken` | no-op | Come salvare il token (chiamato quando il server risponde con `new_token`). |
| `router` | `undefined` | Istanza di vue-router, usata dal fallback di `onSessionExpired`. |
| `onSessionExpired` | alert + redirect `/` | Chiamato quando il server risponde `status: 'session'`. |

Il client restituito espone `hostname`, `makeRequest`, `uploadRequest` e `downloadRequest`.
Tutti e tre i metodi hanno la stessa firma `(endpoint, method, options, callback)`
e gestiscono in automatico il rinnovo del token (`new_token`) e la sessione scaduta.

```js
// JSON — options: { session = true, hostname, body, params }
client.makeRequest('user/login', 'POST', { session: false, body: { ... } }, (data) => { ... });

// Upload multipart — options: { session = true, hostname, body, files }
// body finisce nel campo 'data' (JSON), files è un oggetto { chiave: File | Blob | [..] }
client.uploadRequest('media', 'POST', { body: { ... }, files: { photo: file } }, (data) => { ... });

// Download — apre il blob in una nuova scheda; options: { session = true, hostname, body, params }
client.downloadRequest('report/pdf', 'GET', { params: { id: 3 } }, () => { ... });
```

L'opzione `hostname` per singola richiesta sovrascrive quello del client.

### Validation

Regole pronte per il prop `:rules` dei componenti Vuetify:

```vue
<template>
  <v-form @submit.prevent="submit">
    <v-text-field v-model="email" label="Email" :rules="validation.emailRules" />
    <v-text-field v-model="password" type="password" :rules="validation.passwordRules" />
  </v-form>
</template>

<script setup>
import { validation } from 'generic-module';
</script>
```

Regole disponibili: `requiredRules`, `emailRules`, `siteRules`, `passwordRules`
(maiuscola + minuscola + numero + minimo 8 caratteri). Per validare fuori dai form:

```js
const errors = validation.validateInput(value, validation.emailRules);
// null se valido, altrimenti array di messaggi di errore
```

### Utenti e Login

```js
import { AuthManager, Password, encryptPassword, decryptPassword } from 'generic-module';
```

`AuthManager` gestisce login, registrazione e cambio password:

```vue
<AuthManager
  :logo="logo"
  title="Accedi"
  :secret-key="secretKey"
  :iv="iv"
  :hostname="hostname"
  @call-back="onLogin"
/>
```

| Prop | Obbligatorio | Default | Descrizione |
| --- | --- | --- | --- |
| `logo` | ✔ | — | URL/asset del logo. |
| `title` | ✔ | — | Titolo del form di login. |
| `secretKey` / `iv` | ✔ | — | Chiave e IV per la cifratura AES della password. |
| `hostname` | ✔ | — | Base URL delle API. |
| `signUp` | | `true` | Abilita registrazione e cambio password. |
| `signinTitle` / `changePasswordTitle` | | `''` | Titoli dei form secondari. |
| `primaryColor` / `secondaryColor` | | `''` | Colori del tema. |
| `googleClientId` | | `''` | Abilita il login Google se valorizzato. |

Evento: `@call-back` — emesso al login avvenuto, con la risposta del server.

`Password` è il form di reset password raggiunto da link con token; props
obbligatorie: `logo`, `title`, `loginLink`, `secretKey`, `iv`, `hostname`
(facoltative: `primaryColor`, `secondaryColor`).

`encryptPassword(password, secretKey, iv)` / `decryptPassword(encryptedBase64, secretKey)`
cifrano e decifrano con AES-CBC; sono le stesse funzioni usate internamente dai componenti.

### Add On: Chatty

```vue
<ChattyBot :hostname="hostname" :bot-data="botData" />
```

```js
import { ChattyBot } from 'generic-module';
```

Props obbligatorie: `hostname` e `botData` (configurazione del bot; il campo
`color` sovrascrive la palette di default). Registra uno store Pinia:
richiede un'istanza Pinia attiva nel progetto ospite.

## Sviluppo

```bash
npm run build   # build della libreria in dist/ (formato ES)
npm run lint
```

`dist/` è versionato perché il modulo viene installato direttamente da git:
va rigenerato e committato a ogni modifica di `src/`.

Note sulla build ([vite.config.js](vite.config.js)):

- `vue`, `vue-router`, `pinia` e `vuetify` (regex `/^vuetify/`, che copre anche
  `vuetify/components/*`) sono esterni al bundle: il dist pesa ~270 kB.
- Il plugin `vuetify({ autoImport: true })` è **necessario**: senza, i template
  compilerebbero in `resolveComponent('v-btn')` a runtime, che fallisce nei
  progetti ospite senza registrazione globale dei componenti.
- Il CSS dei componenti viene iniettato dal JS (`vite-plugin-css-injected-by-js`):
  il progetto ospite non deve importare nessun foglio di stile.
- Non importare asset pesanti (font, immagini) in `src`: in library mode Vite li
  inlina in base64 dentro il bundle.
