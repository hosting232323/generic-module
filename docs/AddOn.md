# Add-on (`addOn`)

La chiave `addOn` è un array di stringhe che attiva **funzionalità opzionali** del sito. Ogni add-on aggiunge pagine, componenti e logica dedicata.

```json
"addOn": ["Chatty", "Shop", "Multilingual", "Blog", "Menu"]
```

### Add-on disponibili

| Nome           | Descrizione                                                             |
|----------------|-------------------------------------------------------------------------|
| `Chatty`       | Chatbot virtuale configurabile                                          |
| `Shop`         | E-commerce completo con carrello e pagamento Stripe                     |
| `Multilingual` | Selettore lingua con bandiere nella AppBar                              |
| `Blog`         | Sezione blog con articoli, copertina e pagina di dettaglio              |
| `Menu`         | Menu ristorante per categorie con prezzi e filtro allergeni             |

---

## `Chatty`

Aggiunge un assistente virtuale (chatbot) al sito. Richiede il campo `chattyId` in `info`.

```json
{
  "info": {
    "chattyId": 10
  },
  "addOn": ["Chatty"]
}
```

| Chiave (in `info`) | Tipo     | Obbligatorio | Descrizione                             |
|--------------------|----------|:------------:|-----------------------------------------|
| `chattyId`         | `number` | ✅           | ID univoco del chatbot nel sistema      |

---

## `Multilingual`

Abilita il selettore di lingua nella AppBar con le bandiere corrispondenti ai codici lingua in `info.locales`. Richiede il campo `locales` in `info`.

```json
{
  "info": {
    "locales": ["it", "gb"]
  },
  "addOn": ["Multilingual"]
}
```

| Chiave (in `info`) | Tipo    | Obbligatorio | Descrizione                                                       |
|--------------------|---------|:------------:|-------------------------------------------------------------------|
| `locales`          | `array` | ✅           | Codici lingua da mostrare (es. `"it"`, `"gb"`, `"fr"`, `"es"`)   |

- Con **una sola lingua** viene mostrata una singola bandiera.
- Con **due o più lingue** viene mostrato un menu a tendina con tutte le bandiere.
- La prima lingua in `locales` è quella predefinita.
- La scelta dell'utente viene salvata in `localStorage`.

### Come strutturare i testi multilingua

Tutti i campi testuali del JSON accettano un oggetto con chiavi corrispondenti ai codici in `locales`:

```json
"title": {
  "it": "Benvenuti",
  "gb": "Welcome"
}
```

I campi che non vengono tradotti accettano anche una semplice stringa:

```json
"title": "Testo singola lingua"
```

---

## `Blog`

Abilita la pagina `/blog` con lista articoli e pagina di dettaglio `/blog/:id`. I dati si configurano nella chiave radice `blog`.

```json
{
  "addOn": ["Blog"],
  "blog": {
    "projectName": "nome-progetto",
    "content": [
      {
        "id": 1,
        "title": "Titolo articolo",
        "content": "Testo completo dell'articolo.",
        "cover": "https://example.com/copertina.jpg",
        "updated_at": "25/03/2025 12:59",
        "ordinal": 1,
        "project_id": 3,
        "highlight": true,
        "enrichment": {}
      }
    ]
  }
}
```

### Campi della chiave `blog`

| Chiave        | Tipo     | Obbligatorio | Descrizione                                                      |
|---------------|----------|:------------:|------------------------------------------------------------------|
| `projectName` | `string` | ❌           | Nome del progetto per il caricamento dinamico da backend         |
| `content`     | `array`  | ✅           | Lista degli articoli (modalità statica)                          |

### Campi di ogni articolo in `blog.content`

| Chiave       | Tipo      | Obbligatorio | Descrizione                                                            |
|--------------|-----------|:------------:|------------------------------------------------------------------------|
| `id`         | `number`  | ✅           | Identificatore univoco dell'articolo                                   |
| `title`      | `string`  | ✅           | Titolo dell'articolo                                                   |
| `content`    | `string`  | ✅           | Testo completo dell'articolo                                           |
| `cover`      | `string`  | ❌           | URL dell'immagine di copertina                                         |
| `updated_at` | `string`  | ❌           | Data di aggiornamento (formato `"DD/MM/YYYY HH:mm"`)                  |
| `ordinal`    | `number`  | ❌           | Ordine di visualizzazione                                              |
| `project_id` | `number`  | ❌           | ID del progetto associato (usato in modalità dinamica)                 |
| `highlight`  | `boolean` | ❌           | Se `true`, l'articolo viene mostrato nell'anteprima `blogSummary`      |
| `enrichment` | `object`  | ❌           | Dati arricchiti opzionali                                              |

> **Anteprima nella homepage:** usa la sezione [`blogSummary`](Section.md#blogsummary--anteprima-blog) nell'array `components` per mostrare gli ultimi articoli in homepage.

---

## `Menu`

Abilita la pagina `/menu` con categorie di piatti, descrizioni, prezzi e filtro allergeni. I dati si configurano nella chiave radice `menu`.

```json
{
  "addOn": ["Menu"],
  "menu": {
    "products": [
      {
        "name": { "it": "Antipasti", "gb": "Appetizers" },
        "icon": "mdi-food",
        "image": "https://example.com/categoria.png",
        "items": [
          {
            "name": { "it": "Bruschette", "gb": "Bruschetta" },
            "description": { "it": "Pane tostato con pomodorini.", "gb": "Toasted bread with tomatoes." },
            "image": "https://example.com/bruschette.png",
            "price": 6,
            "allergens": [
              { "it": "glutine", "gb": "gluten" }
            ]
          }
        ]
      }
    ]
  }
}
```

### Campi della chiave `menu`

| Chiave     | Tipo    | Obbligatorio | Descrizione                          |
|------------|---------|:------------:|--------------------------------------|
| `products` | `array` | ✅           | Lista delle categorie del menu       |

### Campi di ogni categoria in `menu.products`

| Chiave  | Tipo                | Obbligatorio | Descrizione                                                        |
|---------|---------------------|:------------:|--------------------------------------------------------------------|
| `name`  | `string` / `object` | ✅           | Nome della categoria                                               |
| `icon`  | `string`            | ❌           | Icona MDI mostrata nella navigazione della categoria               |
| `image` | `string`            | ❌           | Immagine di copertina della categoria                              |
| `items` | `array`             | ✅           | Lista dei piatti della categoria                                   |

### Campi di ogni piatto in `items`

| Chiave        | Tipo                | Obbligatorio | Descrizione                                                   |
|---------------|---------------------|:------------:|---------------------------------------------------------------|
| `name`        | `string` / `object` | ✅           | Nome del piatto                                               |
| `description` | `string` / `object` | ❌           | Descrizione del piatto                                        |
| `image`       | `string`            | ❌           | URL immagine del piatto                                       |
| `price`       | `number`            | ❌           | Prezzo in euro (es. `6` = €6,00)                              |
| `allergens`   | `array`             | ❌           | Lista degli allergeni, ogni elemento è `{ "it": "...", "gb": "..." }` |

---

## `Shop`

Abilita l'e-commerce completo con pagine `/shop` e `/product/:id`, carrello, checkout e pagamento Stripe. I dati si configurano nella chiave radice `store`.

```json
{
  "addOn": ["Shop"],
  "store": {
    "username": "account@example.com",
    "password": "password",
    "addressMode": 1,
    "province": "Napoli",
    "cities": ["Napoli", "Pozzuoli"],
    "products": [...],
    "content": {...}
  }
}
```

### Campi della chiave `store`

| Chiave        | Tipo     | Obbligatorio | Descrizione                                                                |
|---------------|----------|:------------:|----------------------------------------------------------------------------|
| `username`    | `string` | ✅           | Credenziali account `generic-be` per autenticarsi e ottenere i prodotti    |
| `password`    | `string` | ✅           | Password account `generic-be`                                              |
| `addressMode` | `number` | ❌           | `0` = nessun indirizzo richiesto, `1` = indirizzo di spedizione obbligatorio |
| `province`    | `string` | ❌           | Limita le opzioni di spedizione a una provincia specifica                  |
| `cities`      | `array`  | ❌           | Limita le opzioni di spedizione a una lista di comuni                      |
| `products`    | `array`  | ✅           | Catalogo prodotti (vedi sotto)                                             |
| `content`     | `object` | ✅           | Etichette UI dello shop (vedi sotto)                                       |

### Campi di ogni prodotto in `store.products`

| Chiave         | Tipo      | Obbligatorio | Descrizione                                                       |
|----------------|-----------|:------------:|-------------------------------------------------------------------|
| `id`           | `number`  | ✅           | Identificatore univoco del prodotto                               |
| `name`         | `string` / `object` | ✅ | Nome del prodotto                                            |
| `description`  | `string`  | ❌           | Descrizione del prodotto                                          |
| `price`        | `number`  | ✅           | Prezzo in centesimi di euro (es. `700` = €7,00)                   |
| `quantity`     | `number`  | ❌           | Quantità disponibile                                              |
| `highlight`    | `boolean` | ❌           | Se `true`, mette in evidenza il prodotto nella lista              |
| `images`       | `array`   | ❌           | Lista di URL immagine del prodotto                                |
| `product_type` | `string`  | ❌           | Categoria del prodotto (usata per raggruppare nella pagina shop)  |

> **Nota sui prezzi:** il campo `price` è in **centesimi di euro**. `700` corrisponde a €7,00.

### Campi di `store.content` (etichette UI multilingua)

Tutte le etichette accettano stringa semplice o oggetto multilingua `{ "it": "...", "gb": "..." }`.

| Chiave            | Descrizione                                    |
|-------------------|------------------------------------------------|
| `name`            | Nome del carrello (es. "Carrello" / "Cart")    |
| `orderSummary`    | Riepilogo ordine                               |
| `shippingAddress` | Indirizzo di spedizione                        |
| `amount`          | Quantità                                       |
| `totalPrice`      | Prezzo totale                                  |
| `sendOrder`       | Testo pulsante invio ordine                    |
| `proceedCheckout` | Testo pulsante checkout                        |
| `goBack`          | Torna indietro                                 |
| `emptyCart`       | Svuota carrello                                |
| `price`           | Etichetta prezzo                               |
| `details`         | Dettagli prodotto                              |
| `addToCart`       | Aggiungi al carrello                           |
| `description`     | Descrizione                                    |
| `category`        | Categoria                                      |

#### Esempio `store.content`

```json
"content": {
  "name":            { "it": "Carrello",             "gb": "Cart" },
  "orderSummary":    { "it": "Riepilogo Ordini",      "gb": "Order Summary" },
  "shippingAddress": { "it": "Indirizzo di Spedizione","gb": "Shipping Address" },
  "amount":          { "it": "Quantità",              "gb": "Amount" },
  "totalPrice":      { "it": "Prezzo Totale",         "gb": "Total Price" },
  "sendOrder":       { "it": "Invia Ordine",          "gb": "Send Order" },
  "proceedCheckout": { "it": "Procedi al Checkout",   "gb": "Proceed to Checkout" },
  "goBack":          { "it": "Torna Indietro",        "gb": "Go back" },
  "emptyCart":       { "it": "Svuota Carrello",       "gb": "Empty Cart" },
  "price":           { "it": "Prezzo",                "gb": "Price" },
  "details":         { "it": "Dettagli",              "gb": "Details" },
  "addToCart":       { "it": "Aggiungi al carrello",  "gb": "Add to cart" },
  "description":     { "it": "Descrizione",           "gb": "Description" },
  "category":        { "it": "Categoria",             "gb": "Category" }
}
```
