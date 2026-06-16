# generic-fe — Documentazione generale


`generic-fe` è un **generatore di siti web basato su JSON**. Configurando un unico file `productionData.json` ottieni un sito completo, responsivo e multilingua senza toccare il codice sorgente.

---

## Struttura radice del JSON

Il file di configurazione ha quattro chiavi principali:

```json
{
  "addOn": [],
  "info": {},
  "components": [],
  "store": {},
  "menu": {},
  "blog": {}
}
```

| Chiave       | Tipo    | Descrizione                                              |
|--------------|---------|----------------------------------------------------------|
| `addOn`      | `array` | Funzionalità opzionali da attivare                       |
| `info`       | `object`| Metadati del sito (colori, logo, lingue, ecc.)           |
| `components` | `array` | Sezioni della homepage in ordine di visualizzazione      |
| `store`      | `object`| Configurazione e-commerce (richiede add-on `Shop`)       |
| `menu`       | `object`| Menu ristorante con categorie e allergeni (add-on `Menu`)|
| `blog`       | `object`| Articoli del blog (add-on `Blog`)                        |

---

## Sezione `info`

Contiene i **metadati principali** del sito.

```json
"info": {
  "name": "Trattoria Bella Napoli",
  "primaryColor": "#D63447",
  "secondaryColor": "#FFF2E8",
  "logo": "https://example.com/logo.png",
  "homeLink": true,
  "backgroundImage": "/restaurant-bg.jpg",
  "chattyId": 10,
  "locales": ["it", "gb"],
  "socialBubbles": [
    { "icon": "mdi-whatsapp", "url": "https://wa.me/39..." },
    { "icon": "mdi-instagram", "url": "https://instagram.com/..." }
  ]
}
```

### Campi disponibili

| Chiave            | Tipo     | Obbligatorio | Descrizione                                                                  |
|-------------------|----------|:------------:|------------------------------------------------------------------------------|
| `name`            | `string` | ✅           | Nome del sito, usato in intestazioni, email e titolo della pagina            |
| `primaryColor`    | `string` | ✅           | Colore principale del tema in formato hex (pulsanti, icone, linee, mappa)   |
| `secondaryColor`  | `string` | ✅           | Colore secondario del tema (sfondi alternativi, accenti)                     |
| `logo`            | `string` | ✅           | URL del logo visualizzato nella AppBar                                       |
| `homeLink`        | `boolean`| ❌           | Se `true` mostra il link "Home" nella barra di navigazione                   |
| `backgroundImage` | `string` | ❌           | URL dell'immagine di sfondo della homepage                                   |
| `chattyId`        | `number` | ❌           | ID del chatbot (obbligatorio se add-on `Chatty` è attivo)                    |
| `locales`         | `array`  | ❌           | Codici lingua attivi — es. `["it", "gb"]`. Obbligatorio per add-on `Multilingual` |
| `socialBubbles`   | `array`  | ❌           | Pulsanti FAB in basso a destra con icone social                              |

#### socialBubbles — campi per ogni elemento

| Chiave | Tipo     | Descrizione                                                                       |
|--------|----------|-----------------------------------------------------------------------------------|
| `icon` | `string` | Nome icona MDI (vedi [pictogrammers.com](https://pictogrammers.com/library/mdi/)) |
| `url`  | `string` | URL di destinazione del pulsante                                                  |

---

## Modalità di utilizzo

### Come libreria

Installa il pacchetto da GitHub nel progetto che lo consuma:

```json
"generic-fe": "github:hosting232323/generic-fe"
```

Importa e usa i layout predisposti:

#### `DemoLayout`

Riceve l'intero JSON di configurazione come prop e renderizza il sito in tempo reale. Usato per preview dinamiche (es. da una dashboard).

```vue
<DemoLayout :json="productionData" />
```

#### `DemoViewLayout`

Riceve un `id` numerico, recupera la configurazione dal database e renderizza il sito corrispondente.

```vue
<DemoViewLayout :id="10" />
```

---

### Come sito standalone

Crea un branch del progetto (es. `fastsitefe`, `demo-coffee`) e modifica esclusivamente `src/productionData.json`. Tutte le pagine e i componenti sono già inclusi nel codice sorgente.

---

## Route disponibili

| Percorso            | Pagina                                 |
|---------------------|----------------------------------------|
| `/`                 | Homepage                               |
| `/shop`             | Catalogo prodotti e-commerce           |
| `/product/:id`      | Dettaglio prodotto                     |
| `/blog`             | Lista articoli del blog                |
| `/blog/:id`         | Articolo singolo                       |
| `/menu`             | Menu ristorante con filtro allergeni   |
| `/booking`          | Lista eventi / prenotazioni            |
| `/booking/:id`      | Dettaglio evento                       |
| `/payment/success`  | Pagamento completato                   |
| `/payment/failed`   | Pagamento annullato                    |

Le route per `/shop`, `/blog`, `/menu`, `/booking` vengono abilitate automaticamente dai rispettivi add-on.
