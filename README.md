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

## Bug/Fix momentaneo:
Le icone dei form (login, register, etc.) non vengono visualizzate correttamente. Per risolvere il problema, aggiungere il seguente codice al file vuetify.js del progetto in cui si vuole utilizzare il modulo:
```javascript
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

```
