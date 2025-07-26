## 🧩 Add-on disponibili (`addOn`)

La chiave `addOn` è un array di stringhe che attiva **funzionalità opzionali** sul sito.

### 📦 Struttura JSON

```json
"addOn": [
  "Chatty",
  "VirtualTour",
  "Shop",
  "Multilingual",
  "Blog"
]
```

### 🧠 Add-on supportati

| Nome          | Descrizione                                                                 |
|---------------|-----------------------------------------------------------------------------|
| `Chatty`      | Aggiunge un assistente virtuale (chatbot) configurato tramite `chattyId`    |
| `VirtualTour` | Aggiunge una sezione dedicata al tour virtuale del locale o azienda         |
| `Shop` | Aggiunge una sezione dedicata per l'e-commerce         |
| `Multilingual` | In base a quanti paesi inseriti in locales aggiunge una bandiera o un menu con tutte le bandiere corrispondenti alle lingue del sito         |
| `Blog` | Aggiunge una sezione per articoli con immagini, data e preview|

> 📌 **Nota:** Gli add-on vengono caricati solo se presenti nell'array `addOn`.

---

## 💬 AddOn: Chatty (Chatty.vue)

L'add-on **Chatty** aggiunge un assistente virtuale (chatbot) al sito. È configurabile tramite l'identificativo `chattyId`, fornito nella chiave `info`. Questo chatbot può rispondere a domande, guidare gli utenti e fornire assistenza in tempo reale.

### 📦 Tipo JSON richiesto

```json
{
  "info": {
    "chattyId": 10
  },
  "addOn": ["Chatty"]
}
```

### ✅ Campi disponibili

| Chiave     | Tipo     | Obbligatoria | Descrizione                                        |
| ---------- | -------- | ------------ | -------------------------------------------------- |
| `chattyId` | `number` | ✅            | ID univoco del chatbot fornito dal sistema esterno |

> 📌 **Nota**: L’add-on Chatty verrà attivato solo se presente nell’array `addOn` e se `chattyId` è correttamente configurato all'interno dell’oggetto `info`.

---

Perfettamente capito ✅

Ecco la descrizione **completa e coerente** dell’add-on `Multilingual`, nello stesso stile degli altri add-on (`Chatty`, `Shop`, `Blog`):

---

## 🌍 Add-on: Multilingual

L’add-on **Multilingual** abilita la **visualizzazione del sito in più lingue**, in base alla configurazione presente nella chiave `locales`. Il sito mostra un menu con **bandiere** corrispondenti alle lingue attive, permettendo all’utente di selezionare la lingua preferita.

### 📦 Tipo JSON richiesto

```json
{
  "addOn": ["Multilingual"]
}
```

> 📌 **Nota:** L’add-on Multilingual viene attivato **solo se presente** nell’array `addOn` **e se `locales` è presente dentro `info`**.

---
#### ✅ Esempio valido:

```json
"info": {
  "name": "FastSite",
  "primaryColor": "#2F4F4F",
  "secondaryColor": "#D2B48C",
  "logo": "https://imgur.com/mNAxeqq.png",
  "chattyId": 10,
  "locales": ["it", "gb"]
}
```

### 🈳 Come strutturare i testi multilingua

Tutti i testi del sito che vanno tradotti (es. `title`, `description`, `label`, ecc.) devono essere **oggetti con chiave della lingua**:

#### Esempio:

```json
"title": {
  "it": "Vantaggi",
  "gb": "Advantages"
},
"description": {
  "it": "I siti web che progettiamo sono completamente responsive...",
  "gb": "The websites we design are fully responsive..."
}
```

### 🧠 Comportamento

* Il sistema rileva automaticamente la lingua da `locales[0]` come predefinita.
* Viene generato un **menu a bandiere** con una voce per ciascuna lingua indicata.
* Le traduzioni devono essere gestite manualmente per tutti i campi testuali nel JSON (o automaticamente tramite sistema interno se supportato).

---

## 📰 Sezione: Blog (Blog.vue)

La sezione **Blog** permette di mostrare un elenco di articoli o aggiornamenti, ciascuno con **immagine, titolo, anteprima del contenuto e data**, organizzati in griglia. È utile per comunicazioni, novità aziendali o contenuti editoriali.

### 📦 Tipo JSON richiesto

```json
{
  "content": [
    {
      "title": "Il mio blog",
      "url": "Scopri di più...",
      "type": "Static o Dynamic",
      "articles": [
        {
          "title": "Titolo articolo 1",
          "content": "Descrizione articolo",
          "cover": "img.png"
        },
        ...
      ]
    }
  ],
  "menu": "Blog",
  "type": "blog"
}
```

### ✅ Campi disponibili

| Chiave         | Tipo       | Obbligatoria | Descrizione |
|----------------|------------|--------------|-------------|
| `title`        | `string`   | ❌           | Titolo della sezione|
| `url`          | `string`    | ❌          | Testo del collegamento alla pagina dei blog |
| `type`         | `string`   | ✅           | Può essere o Static o Dynamic, con Static **DEVI** aggiungere i post a mano seguendo articles, con Dynamic fa tutto l'endpoint collegato |

---

## 🏰 Add-on: VirtualTour
L’add-on VirtualTour consente di aggiungere un collegamento diretto al tour virtuale del locale o dell’azienda, direttamente all’interno della barra superiore (App Bar) del sito.

### 📦 Tipo JSON richiesto

```json
{
  "addOn": ["VirtualTour"]
}
```

### ✅ Campi disponibili

| Chiave           | Tipo     | Obbligatoria | Descrizione                                                  |
| ---------------- | -------- | ------------ | ------------------------------------------------------------ |
| `virtualTour` | `string` | ✅            | URL al tour virtuale |

### 🧠 Comportamento

* Se presente nell’array `addOn` e se `virtualTour` è valorizzato correttamente, il sistema **mostrerà un pulsante nella App Bar** con testo "Tour Virtuale" che apre il link in una nuova scheda.
* L’ordine e il posizionamento del link è gestito automaticamente.

---

## 🛒 Add-on: Shop

L’add-on **Shop** abilita un sistema di e-commerce completo collegato alla piattaforma `generic-be`. I prodotti vengono mostrati **raggruppati per categoria**, con **immagini, prezzo, descrizione e pulsanti per i dettagli e l’aggiunta al carrello**.

### 📦 Tipo JSON richiesto

```json
{
  "store": {
    "username": "bro.users.info@gmail.com",
    "password": "Ciao1234",
    "addressMode": 1,
    "province": "Barletta-Andria-Trani",
    "cities": [
      "Bisceglie",
      "Trani"
    ]
  },
  "addOn": ["Shop"]
}
```

### ✅ Campi disponibili

| Chiave        | Tipo     | Obbligatoria | Descrizione                                                             |
| ------------- | -------- | ------------ | ----------------------------------------------------------------------- |
| `username`    | `string` | ✅            | Credenziali dell'account `generic-be` per ottenere i prodotti           |
| `password`    | `string` | ✅            | Password dell'account `generic-be`                                      |
| `addressMode` | `number` | ✅            | Modalità gestione indirizzo: `0 = Nessun indirizzo`, `1 = Obbligatorio` |
| `province`    | `string` | ❌            | Provincia di riferimento per le consegne o disponibilità prodotti       |
| `cities`      | `array`  | ❌            | Elenco di città in cui è attivo lo shop (filtraggio opzionale)          |
