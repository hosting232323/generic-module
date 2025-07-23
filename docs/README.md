## ⚙️ Info Generali del Sito (`info`)

La sezione `info` contiene i **metadati principali** del sito, inclusi i colori, il logo, l'identificativo Chatty e le lingue utilizzabili con il multilingua.

### 📦 Struttura JSON

```json
"info": {
  "name": "FastSite",
  "primaryColor": "#2F4F4F",
  "secondaryColor": "#D2B48C",
  "logo": "https://imgur.com/mNAxeqq.png",
  "chattyId": 10,
  "socialBubbles": [
    {
      "icon": "mdi-whatsapp",
      "url": "https://whatsapp.com/"
    },
    ...
  ],
  "locales": [
    "it", "gb"
  ]
}
```

### ✅ Campi disponibili

| Chiave           | Tipo     | Obbligatoria | Descrizione                                                           |
|------------------|----------|--------------|-----------------------------------------------------------------------|
| `name`           | `string` | ✅           | Nome del sito, usato in intestazioni, email e titolo                  |
| `primaryColor`   | `string` | ✅           | Colore principale del tema (es. pulsanti, icone, linee)              |
| `secondaryColor` | `string` | ✅           | Colore secondario del tema (es. sfondi alternativi, accenti)         |
| `logo`           | `string` | ✅           | URL del logo visualizzato nel sito                                   |
| `socialBubbles`           | `array` | ❌           | Lista delle fab mostrate in basso a destra con i vari social, prendere l'icon da https://pictogrammers.com/library/mdi/                                  |
| `chattyId`       | `number` | ❌           | ID utilizzato per l’integrazione con Chatty                          |
| `locales`       | `array` | ❌           | Lista di lingue utilizzate per il multilingua           |

---



