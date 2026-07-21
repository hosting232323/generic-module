# generic-module

Modulo Vue 3 condiviso tra i progetti frontend. Espone un client HTTP, i componenti
di autenticazione e l'add-on ChattyBot. **Non è un'applicazione**: non ha router,
viste, layout o build applicativa.

## Installazione

```bash
npm install git+https://github.com/hosting232323/generic-module.git
```

Le dipendenze `vue`, `vue-router`, `pinia` e `vuetify` sono peer dependencies:
devono essere fornite dal progetto ospite.

## API pubblica

Tutto ciò che il modulo espone è dichiarato in [src/index.js](src/index.js).
Nient'altro è da considerarsi utilizzabile dall'esterno.

### Http Client

```js
import { createHttpClient } from 'generic-module';

const client = createHttpClient({
  hostname: 'https://example.it/api/',
  authHeader: 'Authorization',
  router,
  getToken: () => localStorage.getItem('token'),
  setToken: (token) => localStorage.setItem('token', token),
  onSessionExpired: (data) => { /* ... */ }
});

client.makeRequest('user/login', 'POST', { body: {...} }, (data) => {});
```

Il client espone `makeRequest`, `uploadRequest`, `downloadRequest` e `hostname`.

### Utenti e Login

```js
import { AuthManager, Password, encryptPassword, decryptPassword } from 'generic-module';
```

- `AuthManager` — gestisce login, registrazione e cambio password
  (props: `logo`, `title`, `secretKey`, `iv`, `hostname`, `signUp`, `googleClientId`, …).
- `Password` — form di reset password da link con token.
- `encryptPassword` / `decryptPassword` — cifratura AES della password.

### Add On: Chatty

```js
import { ChattyBot } from 'generic-module';
```

```vue
<ChattyBot :hostname="hostname" :bot-data="botData" />
```

Registra lo store Pinia `chatty:genericFeStore`; richiede un'istanza Pinia attiva.

## Sviluppo

```bash
npm run build   # build della libreria in dist/ (formato ES)
npm run lint
```

`dist/` è versionato perché il modulo viene installato direttamente da git:
va rigenerato e committato a ogni modifica di `src/`.
