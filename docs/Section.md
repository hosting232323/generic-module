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

| Chiave        | Tipo                | Obbligatoria               | Descrizione                                                                      |
| ------------- | ------------------- | -------------------------- | -------------------------------------------------------------------------------- |
| `title`       | `string`            | ✅ (solo nel primo oggetto) | Titolo generale della sezione.                                                   |
| `advantages`  | `array`             | ✅                          | Lista dei vantaggi. Ogni elemento deve contenere `name`, `description`, `image`. |
| `name`        | `string`            | ✅                          | Titolo specifico di ogni vantaggio.                                              |
| `description` | `string (HTML)`     | ✅                          | Descrizione del vantaggio, supporta HTML.                                        |
| `image`       | `string` o `object` | ✅                          | Immagine del vantaggio. Può essere una stringa (URL) o `{ desktop, mobile }`.    |
| `menu`        | `string`            | ✅                          | Nome della voce nel menu laterale.                                               |
| `type`        | `string`            | ✅                          | Deve essere `"advantages"`.                                                      |

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

| Chiave               | Tipo                      | Obbligatoria | Descrizione                                                           |
| -------------------- | ------------------------- | ------------ | --------------------------------------------------------------------- |
| `title`              | `string`                  | ✅            | Titolo principale della sezione.                                      |
| `subtitle`           | `string`                  | ❌            | Sottotitolo opzionale.                                                |
| `description`        | `string (HTML)`           | ✅            | Descrizione testuale, supporta HTML.                                  |
| `button`             | `string`                  | ❌            | Testo del bottone. Necessita anche del campo `url`.                   |
| `url`                | `string (URL)`            | ❌            | Link di destinazione del bottone. Necessita anche del campo `button`. |
| `image`              | `string` o `object`       | ✅            | Immagine da mostrare. Può essere `{ desktop, mobile }`.               |
| `orientationDesktop` | `string` (`left`/`right`) | ❌            | Posizione dell’immagine su desktop. Default: `"right"`.               |
| `orientationMobile`  | `string` (`top`/`bottom`) | ❌            | Posizione dell’immagine su mobile. Default: `"bottom"`.               |
| `menu`               | `string`                  | ✅            | Nome della voce nel menu laterale.                                    |
| `type`               | `string`                  | ✅            | Deve essere `"dualSection"`.                                          |

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

| Chiave   | Tipo                          | Obbligatoria | Descrizione                                                              |
| -------- | ----------------------------- | ------------ | ------------------------------------------------------------------------ |
| `images` | `array` di stringhe o oggetti | ✅            | Lista di immagini, ciascuna può essere `string` o `{ desktop, mobile }`. |
| `type`   | `string`                      | ✅            | `"gallery"` per scorrimento manuale, `"carusel"` per automatico.         |
| `menu`   | `string`                      | ✅            | Nome della voce nel menu laterale.                                       |

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

| Chiave        | Tipo     | Obbligatoria | Descrizione                                                     |
| ------------- | -------- | ------------ | --------------------------------------------------------------- |
| `title`       | `string` | ❌            | Titolo opzionale della sezione.                                 |
| `services`    | `array`  | ✅            | Lista dei servizi, ciascun servizio con `name` e `description`. |
| `name`        | `string` | ✅            | Nome del servizio.                                              |
| `description` | `string` | ✅            | Descrizione dettagliata del servizio.                           |
| `menu`        | `string` | ✅            | Nome della voce nel menu laterale.                              |
| `type`        | `string` | ✅            | Deve essere `"services"`.                                       |

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

| Chiave     | Tipo     | Obbligatoria        | Descrizione                                       |
| ---------- | -------- | ------------------- | ------------------------------------------------- |
| `title`    | `string` | ❌                   | Titolo della sezione.                             |
| `subtitle` | `string` | ❌                   | Sottotitolo della sezione.                        |
| `contacts` | `array`  | ❌                   | Lista dei contatti con `icon` e `title`.          |
| `icon`     | `string` | ✅ per ogni contatto | Icona corrispondente al contatto (es. mdi-email). |
| `title`    | `string` | ✅ per ogni contatto | Valore del contatto (email, telefono ecc.).       |
| `menu`     | `string` | ✅                   | Nome della voce nel menu.                         |
| `type`     | `string` | ✅                   | Deve essere `"contacts"`.                         |

        
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

| Chiave        | Tipo     | Obbligatoria | Descrizione                             |
| ------------- | -------- | ------------ | --------------------------------------- |
| `username`    | `string` | ✅            | Email dell’utente.                      |
| `password`    | `string` | ✅            | Password dell’utente.                   |
| `addressMode` | `number` | ❌            | Modalità di visualizzazione.            |
| `province`    | `string` | ❌            | Provincia da limitare nell’elenco.      |
| `cities`      | `array`  | ❌            | Array di città limitate alla provincia. |
