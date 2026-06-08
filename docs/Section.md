# Sezioni (`components`)

L'array `components` definisce le sezioni della homepage nell'ordine in cui appaiono. Ogni elemento ha questa struttura base:

```json
{
  "type": "nome_sezione",
  "variant": "variante_opzionale",
  "menu": { "it": "Voce menu", "gb": "Menu item" },
  "content": {}
}
```

| Chiave    | Tipo                    | Descrizione                                                               |
|-----------|-------------------------|---------------------------------------------------------------------------|
| `type`    | `string`                | Tipo di sezione (obbligatorio)                                            |
| `variant` | `string`                | Variante visuale (solo per alcune sezioni)                                |
| `menu`    | `string` oppure `object`| Voce mostrata nella barra di navigazione. Omettere per nascondere la voce |
| `content` | `object`                | Dati specifici della sezione                                              |

> **Multilingua:** tutti i campi testuali accettano sia una stringa semplice `"testo"` che un oggetto con chiavi lingua `{ "it": "testo", "gb": "text" }`. Vedere la sezione [Multilingual](AddOn.md#multilingual) per i dettagli.

---

## `gallery` — Galleria / Carosello

Mostra un carosello di immagini a scorrimento automatico.

```json
{
  "type": "gallery",
  "menu": { "it": "Galleria", "gb": "Gallery" },
  "content": {
    "type": "automatic",
    "images": [
      "https://example.com/foto1.jpg",
      { "desktop": "https://example.com/desktop.jpg", "mobile": "https://example.com/mobile.jpg" }
    ]
  }
}
```

### Campi `content`

| Chiave   | Tipo    | Obbligatorio | Descrizione                                                                      |
|----------|---------|:------------:|----------------------------------------------------------------------------------|
| `type`   | `string`| ✅           | Usa `"automatic"` per lo scorrimento automatico                                  |
| `images` | `array` | ✅           | Lista immagini. Ogni elemento può essere un URL stringa o `{ desktop, mobile }` |

---

## `dualSection` — Sezione Doppia

Affianca un'immagine a un blocco di testo. Orientazione configurabile per desktop e mobile.

```json
{
  "type": "dualSection",
  "menu": { "it": "Chi Siamo", "gb": "About Us" },
  "content": {
    "title": { "it": "Chi Siamo", "gb": "About Us" },
    "subtitle": { "it": "La nostra storia", "gb": "Our story" },
    "description": { "it": "Testo con <strong>HTML</strong> supportato.", "gb": "Text with <strong>HTML</strong> supported." },
    "button": { "it": "Scopri di più", "gb": "Learn more" },
    "url": "/shop",
    "image": "https://example.com/immagine.jpg",
    "orientationDesktop": "left",
    "orientationMobile": "top"
  }
}
```

### Campi `content`

| Chiave               | Tipo                      | Obbligatorio | Descrizione                                                        |
|----------------------|---------------------------|:------------:|--------------------------------------------------------------------|
| `title`              | `string` / `object`       | ✅           | Titolo principale della sezione                                    |
| `subtitle`           | `string` / `object`       | ❌           | Sottotitolo opzionale                                              |
| `description`        | `string` / `object`       | ✅           | Descrizione testuale, supporta HTML                                |
| `button`             | `string` / `object`       | ❌           | Testo del pulsante. Richiede anche `url`                           |
| `url`                | `string`                  | ❌           | Link di destinazione del pulsante. Richiede anche `button`         |
| `image`              | `string` / `object`       | ✅           | Immagine. Può essere URL stringa o `{ desktop, mobile }`           |
| `orientationDesktop` | `"left"` / `"right"`      | ❌           | Posizione immagine su desktop. Default: `"right"`                  |
| `orientationMobile`  | `"top"` / `"bottom"`      | ❌           | Posizione immagine su mobile. Default: `"bottom"`                  |

---

## `advantages` — Vantaggi

Mostra una griglia di card con immagine, titolo e descrizione. Disponibile in quattro varianti grafiche.

```json
{
  "type": "advantages",
  "variant": "default",
  "menu": { "it": "Vantaggi", "gb": "Advantages" },
  "content": {
    "advantages": [
      {
        "name": { "it": "Ingredienti Freschi", "gb": "Fresh Ingredients" },
        "description": { "it": "Solo prodotti di alta qualità.", "gb": "Only high-quality products." },
        "image": "https://example.com/immagine.jpg"
      }
    ]
  }
}
```

### Varianti disponibili (`variant`)

| Valore       | Descrizione                            |
|--------------|----------------------------------------|
| `"default"`  | Layout classico con card               |
| `"business"` | Stile corporate                        |
| `"creative"` | Layout creativo con overlay            |
| `"ecommerce"`| Ottimizzato per prodotti e-commerce    |

### Campi `content`

| Chiave        | Tipo                | Obbligatorio | Descrizione                                                               |
|---------------|---------------------|:------------:|---------------------------------------------------------------------------|
| `advantages`  | `array`             | ✅           | Lista dei vantaggi                                                        |

### Campi di ogni elemento in `advantages`

| Chiave        | Tipo                | Obbligatorio | Descrizione                                                               |
|---------------|---------------------|:------------:|---------------------------------------------------------------------------|
| `name`        | `string` / `object` | ✅           | Titolo del vantaggio                                                      |
| `description` | `string` / `object` | ✅           | Descrizione del vantaggio, supporta HTML                                  |
| `image`       | `string` / `object` | ✅           | Immagine. Può essere URL stringa o `{ desktop, mobile }`                  |

---

## `text` — Testo libero

Sezione di testo con titolo e descrizione HTML, con allineamento configurabile.

```json
{
  "type": "text",
  "content": {
    "title": { "it": "Il nostro approccio", "gb": "Our approach" },
    "description": { "it": "Paragrafo con <em>HTML</em> supportato.", "gb": "Paragraph with <em>HTML</em> support." },
    "orientationTitle": "center",
    "orientationDescription": "left"
  }
}
```

### Campi `content`

| Chiave                   | Tipo                                    | Obbligatorio | Descrizione                             |
|--------------------------|-----------------------------------------|:------------:|-----------------------------------------|
| `title`                  | `string` / `object`                     | ❌           | Titolo della sezione                    |
| `description`            | `string` / `object`                     | ❌           | Testo descrittivo, supporta HTML        |
| `orientationTitle`       | `"left"` / `"center"` / `"right"`      | ❌           | Allineamento titolo. Default: `"left"`  |
| `orientationDescription` | `"left"` / `"center"` / `"right"`      | ❌           | Allineamento testo. Default: `"left"`   |

---

## `reviews` — Recensioni

Mostra le recensioni dei clienti in un carosello con avatar generato automaticamente e stelle di valutazione.

```json
{
  "type": "reviews",
  "menu": { "it": "Recensioni", "gb": "Reviews" },
  "content": {
    "title": { "it": "Cosa dicono di noi", "gb": "What they say about us" },
    "reviews": [
      {
        "name": "Mario Rossi",
        "description": "Esperienza fantastica, tornerò sicuramente!",
        "stars": 5
      },
      {
        "name": "Anna Bianchi",
        "description": "Ottimo servizio e prodotti di qualità.",
        "stars": 4
      }
    ]
  }
}
```

### Campi `content`

| Chiave    | Tipo                | Obbligatorio | Descrizione                        |
|-----------|---------------------|:------------:|------------------------------------|
| `title`   | `string` / `object` | ❌           | Titolo della sezione               |
| `reviews` | `array`             | ✅           | Lista delle recensioni             |

### Campi di ogni elemento in `reviews`

| Chiave        | Tipo     | Obbligatorio | Descrizione                              |
|---------------|----------|:------------:|------------------------------------------|
| `name`        | `string` | ✅           | Nome del recensore                       |
| `description` | `string` | ✅           | Testo della recensione                   |
| `stars`       | `number` | ✅           | Valutazione da `1` a `5`                 |

---

## `services` — Servizi

Elenco espandibile dei servizi offerti tramite pannelli accordion.

```json
{
  "type": "services",
  "menu": { "it": "Servizi", "gb": "Services" },
  "content": {
    "title": { "it": "I nostri servizi", "gb": "Our services" },
    "services": [
      {
        "name": { "it": "Consulenza", "gb": "Consulting" },
        "description": { "it": "Descrizione del servizio.", "gb": "Service description." }
      }
    ]
  }
}
```

### Campi `content`

| Chiave     | Tipo                | Obbligatorio | Descrizione                     |
|------------|---------------------|:------------:|---------------------------------|
| `title`    | `string` / `object` | ❌           | Titolo opzionale della sezione  |
| `services` | `array`             | ✅           | Lista dei servizi               |

### Campi di ogni elemento in `services`

| Chiave        | Tipo                | Obbligatorio | Descrizione                           |
|---------------|---------------------|:------------:|---------------------------------------|
| `name`        | `string` / `object` | ✅           | Nome del servizio                     |
| `description` | `string` / `object` | ✅           | Descrizione dettagliata del servizio  |

---

## `contacts` — Contatti

Mostra le informazioni di contatto con icone e link opzionali. Include anche un form di contatto diretto.

```json
{
  "type": "contacts",
  "menu": { "it": "Contatti", "gb": "Contacts" },
  "content": {
    "title": { "it": "I nostri contatti", "gb": "Our contacts" },
    "subtitle": { "it": "Contattaci direttamente", "gb": "Contact us directly" },
    "contacts": [
      {
        "icon": "mdi-phone",
        "title": "+39 081 123 4567"
      },
      {
        "icon": "mdi-email",
        "title": "info@example.it"
      },
      {
        "icon": "mdi-instagram",
        "title": { "it": "Seguici su Instagram", "gb": "Follow us on Instagram" },
        "url": "https://instagram.com/example"
      }
    ]
  }
}
```

### Campi `content`

| Chiave     | Tipo                | Obbligatorio | Descrizione                                  |
|------------|---------------------|:------------:|----------------------------------------------|
| `title`    | `string` / `object` | ❌           | Titolo della sezione                         |
| `subtitle` | `string` / `object` | ❌           | Sottotitolo della sezione                    |
| `contacts` | `array`             | ❌           | Lista delle voci di contatto                 |

### Campi di ogni elemento in `contacts`

| Chiave  | Tipo                | Obbligatorio | Descrizione                                                                        |
|---------|---------------------|:------------:|------------------------------------------------------------------------------------|
| `icon`  | `string`            | ✅           | Icona MDI (es. `mdi-phone`, `mdi-email`, `mdi-whatsapp`)                          |
| `title` | `string` / `object` | ✅           | Valore del contatto (numero, email, nome social, ecc.)                             |
| `url`   | `string`            | ❌           | Se presente, rende il contatto cliccabile (es. `tel:+39...`, `mailto:...`, URL)   |

---

## `map` — Mappa interattiva

Mostra una mappa OpenLayers con un marcatore sulla posizione specificata.

```json
{
  "type": "map",
  "content": {
    "title": { "it": "Dove siamo", "gb": "Find us" },
    "address": "Via Roma 1, 80100 Napoli NA, Italy",
    "coordinates": [14.2681, 40.8518],
    "zoom": 15
  }
}
```

### Campi `content`

| Chiave        | Tipo                | Obbligatorio | Descrizione                                               |
|---------------|---------------------|:------------:|-----------------------------------------------------------|
| `title`       | `string` / `object` | ❌           | Titolo mostrato sopra la mappa                            |
| `address`     | `string`            | ❌           | Indirizzo testuale mostrato sotto la mappa                |
| `coordinates` | `array`             | ✅           | Coppia `[longitudine, latitudine]` della posizione        |
| `zoom`        | `number`            | ✅           | Livello di zoom (es. `15` per vista di quartiere, `9` per vista provinciale) |

> **Nota:** il marcatore viene colorato automaticamente con `info.primaryColor`.

---

## `line` — Linea separatrice

Aggiunge un separatore orizzontale tra le sezioni. Nessun campo `content` richiesto.

```json
{
  "type": "line"
}
```

Il colore della linea segue `info.primaryColor`.

---

## `blogSummary` — Anteprima Blog

Mostra un carosello con gli ultimi articoli del blog. Richiede che l'add-on `Blog` sia attivo e che la chiave `blog` sia configurata.

```json
{
  "type": "blogSummary",
  "menu": { "it": "Blog", "gb": "Blog" },
  "content": {
    "title": { "it": "I nostri ultimi post", "gb": "Our latest posts" }
  }
}
```

### Campi `content`

| Chiave  | Tipo                | Obbligatorio | Descrizione                                      |
|---------|---------------------|:------------:|--------------------------------------------------|
| `title` | `string` / `object` | ❌           | Titolo della sezione (default: "I nostri ultimi post") |

> **Nota:** vengono mostrati i post con `highlight: true` nella chiave `blog.content`. Se nessun post ha `highlight: true`, vengono mostrati gli ultimi 3.

---

## `brandlist` — Lista Brand

Mostra un carosello orizzontale scorrevole di loghi brand.

```json
{
  "type": "brandlist",
  "content": {
    "brands": [
      "https://example.com/logo1.png",
      "https://example.com/logo2.png"
    ]
  }
}
```

### Campi `content`

| Chiave   | Tipo    | Obbligatorio | Descrizione                                           |
|----------|---------|:------------:|-------------------------------------------------------|
| `brands` | `array` | ✅           | Lista di URL immagine (stringhe) dei loghi da mostrare |
