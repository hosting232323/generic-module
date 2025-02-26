## Installazione

Dopo aver clonato la repository, installa le dipendenze:
```bash
npm install
```

## Utilizzo

### Build del Modulo

Per buildare il modulo:
```bash
npm run build
```

### Link simbolico
Per creare un link simbolico al modulo sulla tua macchina:
```bash
npm link
```

### Installazione in un altro progetto
Per installare il modulo in un altro progetto:
```bash
npm link generic-module
```
Assicurati di aver buildato e linkato il modulo prima di installarlo in un altro progetto.

### Rimozione del link simbolico
Per rimuovere il link simbolico dalla macchina locale:
```bash
npm unlink
```

### Rimozione del modulo da un altro progetto

Per rimuovere il modulo da un altro progetto:
```bash
npm unlink generic-module
```

### Abilitare login Google
Per abilitare il login con Google, è necessario aggiungere nel file .env del progetto in cui si vuole utilizzare il modulo la variabile VITE_GOOGLE_CLIENT_ID con il CLIENT_ID ottenuto da Google Cloud Console. Esempio:
```bash
VITE_GOOGLE_CLIENT_ID='1234567890'
```

## Bug/Fix momentaneo icone:
Le icone dei form (login, register, etc.) a volte non vengono visualizzate correttamente. Per risolvere il problema, aggiungere il seguente codice al file vuetify.js del progetto in cui si vuole utilizzare il modulo:
```javascript
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

```
