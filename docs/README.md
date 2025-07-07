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

Ecco una sezione da aggiungere al README del progetto `generic-fe` per spiegare **le modalità di utilizzo**:

---

## 🚀 Utilizzo del progetto `generic-fe`

Il progetto `generic-fe` è pensato per essere **riutilizzabile e configurabile** in più contesti. Può essere integrato come **libreria** oppure usato come base per la **creazione di un sito completo**.

### 📦 Come libreria

È possibile installarlo e utilizzarlo come **libreria front-end** tramite GitHub:

```json
"generic-fe": "github:hosting232323/generic-fe"
```

Dopo l’installazione, puoi importare e utilizzare i layout predisposti:

#### 🔸 `DemoLayout`

Usato principalmente per **modificare e visualizzare siti demo** dinamicamente.
Passa il JSON di configurazione completo come `props`, seguendo le specifiche dei file di documentazione (es. da `sellerdashboard`).

```ts
<DemoLayout :json="productionData" />
```

#### 🔸 `DemoViewLayout`

Usato per **visualizzare un sito demo** a partire da un ID salvato sul database.
Il layout effettuerà il fetch dei dati corrispondenti all’`id`.

```ts
<DemoViewLayout :id="10" />
```

---

### 🌐 Come base per un sito completo

Puoi anche **creare un branch del progetto** `generic-fe` (es. `fastsitefe`, `demo-coffee`, ecc.) e usarlo per costruire un sito **già completo**, semplicemente configurando il file `productionData.json`.

In questo scenario, tutte le sezioni del sito sono già presenti nel codice, quindi ti basta personalizzare:

* i contenuti (es. testi, immagini)
* i metadati (`info`)
* la struttura delle sezioni (`sections`, `header`, `footer`, ecc.)

Questo approccio è ideale per creare rapidamente nuovi siti demo a partire da un template solido.

---

### 📘 Esempio di configurazione `productionData`

Vedi la sezione `info` per una struttura JSON d’esempio:

```ts
info: {
  name: "FastSite",
  primaryColor: "#2F4F4F",
  secondaryColor: "#D2B48C",
  logo: "https://imgur.com/mNAxeqq.png",
  chattyId: 10,
  socialBubbles: [
    { icon: "mdi-whatsapp", url: "https://whatsapp.com/" }
  ],
  locales: ["it", "gb"]               
  ...
}
```

---

Se vuoi, posso prepararti una bozza dell’intero README con sezione introduttiva, requisiti, modalità di utilizzo e contributi. Fammi sapere!

