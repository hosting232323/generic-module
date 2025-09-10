## 🟩 Sezione: Vantaggi (Advantages.vue)

Questa sezione viene utilizzata per mostrare una lista di **vantaggi o punti di forza** dell’azienda o dei suoi servizi, organizzati come card visivamente accattivanti con immagine, titolo e descrizione.

### 📦 Tipo JSON richiesto

```json
{
  "content": {
    "title": "Vantaggi",
    "advantages": [
      {
        "name": "Titolo del vantaggio",
        "description": "Descrizione dettagliata del vantaggio offerto.",
        "image": {
          "desktop": "URL immagine versione desktop",
          "mobile": "URL immagine versione mobile"
        }
      },
      ...
    ]
  },
  "menu": "Nome della voce nel menu",
  "type": "advantages"
}
```

### ✅ Campi disponibili

| Chiave         | Tipo              | Obbligatoria | Descrizione |
|----------------|-------------------|--------------|-------------|
| `title`        | `string`          | ✅ (solo nel primo oggetto) | Titolo generale della sezione, es: "I nostri vantaggi". |
| `name`         | `string`          | ✅           | Titolo specifico di ogni vantaggio. |
| `description`  | `string (HTML)`   | ✅           | Descrizione del vantaggio. Supporta HTML. |
| `image`        | `string` _oppure_ `object` | ✅ | L’immagine da mostrare. Può essere una stringa (`url`) oppure un oggetto con `{ desktop, mobile }`. |

---

## 🟪 Sezione: Sezione Doppia (`DualSection.vue`)

La sezione **DualSection** permette di mostrare **un’immagine affiancata a un blocco di testo**, con titolo, sottotitolo, descrizione e un bottone opzionale. L'immagine può essere mostrata a sinistra o a destra (su desktop) o in alto o in basso (su mobile), in base alla configurazione.

### 📦 Tipo JSON richiesto

```json
{
  "content": {
    "title": "Titolo principale",
    "subtitle": "Sottotitolo descrittivo",
    "description": "Descrizione testuale anche con HTML.",
    "button": "Testo del bottone",
    "url": "https://link-del-bottone.it",
    "image": {
      "desktop": "URL immagine desktop",
      "mobile": "URL immagine mobile"
    },
    "orientationDesktop": "left",
    "orientationMobile": "top"
  },
  "menu": "Nome della voce nel menu",
  "type": "dualSection"
}
```

### ✅ Campi disponibili

| Chiave               | Tipo              | Obbligatoria | Descrizione |
|----------------------|-------------------|--------------|-------------|
| `title`              | `string`          | ✅           | Titolo principale della sezione. |
| `subtitle`           | `string`          | ❌           | Sottotitolo opzionale. |
| `description`        | `string (HTML)`   | ✅           | Descrizione della sezione, supporta HTML. |
| `button`             | `string`          | ❌           | Testo da mostrare nel bottone. Necessita anche del campo `url`. |
| `url`                | `string (URL)`    | ❌           | Link su cui reindirizza il bottone. Necessita anche del campo `button`. |
| `image`              | `string` o `object` | ✅         | Immagine da mostrare. Può essere una stringa (`url`) o un oggetto con `{ desktop, mobile }`. |
| `orientationDesktop` | `string` (`left`/`right`) | ❌ | Posizione dell’immagine su desktop. Default: `"right"`. |
| `orientationMobile`  | `string` (`top`/`bottom`) | ❌ | Posizione dell’immagine su mobile. Default: `"bottom"`. |

---

## 🖼️ Sezione: Galleria/Carosello (`Gallery.vue`)

La sezione **Gallery/Carosello** mostra una **galleria a scorrimento** di immagini tramite carousel. Supporta immagini diverse per desktop e mobile.

### 📦 Tipo JSON richiesto

```json
{
  "content": {
    "images": [
      "url_immagine_singola.jpg",
      "url_immagine_singola.jpg",
      "url_immagine_singola.jpg"
    ],
    "type": "automatic"
  },
  "menu": "Nome della voce nel menu",
  "type": "gallery"
}
```

### ✅ Campi disponibili

| Chiave     | Tipo                | Obbligatoria | Descrizione |
|------------|---------------------|--------------|-------------|
| `content`  | `array` di stringhe o oggetti | ✅ | Ogni elemento rappresenta un'immagine nel carousel. Può essere una `string` (immagine unica) oppure un oggetto `{ desktop, mobile }`. |
| `menu`     | `string`            | ✅           | Nome della voce nel menu laterale. |
| `type`     | `string`            | ✅           | Deve essere `"gallery"` per attivare il componente a scorrimento manuale o `"carusel"` per lo scorrimento automatico. |

---

## 🛠️ Sezione: Servizi (`Services.vue`)

La sezione **Servizi** mostra un elenco espandibile dei servizi offerti, ciascuno con **titolo e descrizione**. Utilizza `v-expansion-panels` per un'esperienza utente ordinata e interattiva.

### 📦 Tipo JSON richiesto

```json
{
  "content": {
    "title": "Titolo sezione (opzionale)"
    "services": [
      {
        "name": "Nome servizio",
        "description": "Descrizione dettagliata del servizio"
      },
      {
        "name": "Nome servizio",
        "description": "Descrizione dettagliata del servizio"
      }
    ],
  },
  "menu": "Nome della voce nel menu",
  "type": "services"
}
```

### ✅ Campi disponibili

| Chiave     | Tipo        | Obbligatoria | Descrizione |
|------------|-------------|--------------|-------------|
| `content`  | `array`     | ✅           | Una lista di oggetti. Il primo può contenere un `title` per la sezione (opzionale), i successivi devono contenere `name` e `description` per ogni servizio. |
| `menu`     | `string`    | ✅           | Nome della voce nel menu laterale. |
| `type`     | `string`    | ✅           | Deve essere `"services"` per attivare correttamente il componente. |

---


## 🗺️ Sezione: Mappa (`Map.vue`)

La sezione **Mappa** mostra una mappa interattiva con un marcatore sulla posizione specificata, utile per far sapere dove si trova l'attività o sede dell’azienda. Utilizza [OpenLayers](https://openlayers.org/) per la gestione della mappa.

### 📦 Tipo JSON richiesto

```json
{
  "content": {
    "coordinates": [longitudine, latitudine],
    "zoom": livello_di_zoom
  },
  "type": "map"
}
```

### ✅ Campi disponibili

| Chiave         | Tipo       | Obbligatoria | Descrizione |
|----------------|------------|--------------|-------------|
| `coordinates`  | `array`    | ✅           | Coppia `[longitudine, latitudine]` della posizione da mostrare. |
| `zoom`         | `number`   | ✅           | Livello di zoom della mappa (es. `9` per zoom provinciale). |
| `type`         | `string`   | ✅           | Deve essere `"map"` per attivare correttamente il componente. |

💡 **Nota:** Il marcatore viene colorato automaticamente in base al `primaryColor` presente in `info.primaryColor`, convertito in un'icona colorata via endpoint backend (`/colorize-image`).

---

## ➖ Sezione: Linea Separatrice (`Line.vue`)

La sezione **Linea** aggiunge un separatore orizzontale (una riga) tra le sezioni del sito per migliorarne la leggibilità e la struttura visiva. Il colore della linea si adatta automaticamente al tema tramite `info.primaryColor`.

### 📦 Tipo JSON richiesto

```json
{
  "type": "line"
}
```

### ✅ Campi disponibili

| Chiave   | Tipo     | Obbligatoria | Descrizione                                 |
|----------|----------|--------------|---------------------------------------------|
| `type`   | `string` | ✅           | Deve essere `"line"` per attivare la riga.  |

💡 **Nota:** Il colore della linea è controllato da `info.primaryColor`.

---

## 📬 Sezione: Contatti (`Contacts.vue`)

La sezione **Contatti** mostra le informazioni di contatto dell’attività (email, telefono, social, indirizzo ecc.), con icone corrispondenti e link personalizzati dove necessario. Inoltre, include un **form di contatto diretto** che invia una mail al proprietario del sito.

### 📦 Tipo JSON richiesto

```json
{
  "content": {
    "title": "I nostri contatti",
    "subtitle": "Contattaci direttamente con questo form",
    "contacts": [
      {
        "icon": "mdi-email",
        "title": "giovanni.colasanto@fastsite.it"
      },
      ...
    ]
  },
  "menu": "Contatti",
  "type": "contacts"
}
```

### ✅ Campi disponibili

| Chiave     | Tipo     | Obbligatoria | Descrizione                                                                 |
|------------|----------|--------------|-----------------------------------------------------------------------------|
| `type`     | `string` | ✅           | Deve essere `"contacts"`                                                   |
| `menu`     | `string` | ✅           | Etichetta da mostrare nel menu di navigazione                              |
| `content`  | `object` | ✅           | Oggetto contenente uno o più dei seguenti campi                            |
| `title`    | `string` | ❌           | Titolo della sezione                                                            |
| `subtitle`    | `string` | ❌           | Sottotitolo della sezione                                                         |
| `contacts`    | `array` | ❌           | Lista dei contatti con i vari social, prendere l'icon da https://pictogrammers.com/library/mdi/|

        
---

## 📬 Sezione: Indirizzo

La sezione **Indirizzo** consente agli utenti di inserire il loro nome, cognome, e indirizzo. Può essere utile per moduli di registrazione, checkout, o altre interazioni che richiedono l'inserimento di dati personali. La sezione include anche un campo di autocompletamento per la selezione della regione, provincia, città e indirizzo. Puoi limitare gli indirizzi per Province e Comuni

### 📦 Tipo JSON richiesto

```json
"store": {
  "username": "esempio@dominio.it",
  "password": "esempio",
  "addressMode": 1,
  "province": "Barletta-Andria-Trani",
  "cities": [
    "Lanzo Torinese",
    "Cafasse"
  ]
}
```

### ✅ Campi disponibili

| Chiave     | Tipo     | Obbligatoria | Descrizione                                                                 |
|------------|----------|--------------|-----------------------------------------------------------------------------|
| `username`     | `string` | ✅           | Indirizzo email dell'utente, utilizzato per identificare l'account     |
| `password`     | `string` | ✅           | La password dell'utente per l'accesso.                                 |
| `addressMode`    | `number` | ❌           | La modalità di visualizzazione dell'indirizzo. Se non inserita manda direttamente su stripe.|
| `province`    | `string` | ❌           | La provincia selezionata per l'indirizzo. Se fornita, il componente mostrerà solo questa provincia nell'elenco|
| `cities` | `array` | ❌ | Un array che contiene le città limitate alla provincia selezionata. Se non specificato, tutte le città della provincia saranno disponibili.|

