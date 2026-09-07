import * as klaro from 'klaro/dist/klaro-no-css';
import 'klaro/dist/klaro.css';

const translations = {
  it: {
    consentModal: {
      title: 'Gestione dei Cookie',
      description: 'Questo sito web utilizza Google Analytics per comprendere come i visitatori interagiscono con il nostro sito web e migliorare la tua esperienza di navigazione.'
    },
    privacyPolicy: {
      name: 'informativa sulla privacy',
      text: 'Per saperne di più, leggi la nostra {privacyPolicy}.'
    },
    consentNotice: {
      description: 'Questo sito utilizza cookie tecnici necessari al suo funzionamento, sempre attivi, e cookie analitici di Google Analytics per analizzare in forma anonima l’uso del sito. Puoi decidere se autorizzare o meno i cookie analitici. Nomi, finalità e durate di tutti i cookie sono indicati nella nostra {privacyPolicy}.',
      learnMore: 'Personalizza',
      acceptAll: 'Accetta',
      decline: 'Rifiuta'
    },
    ok: 'Accetta',
    save: 'Salva',
    decline: 'Rifiuta',
    close: 'Chiudi',
    acceptAll: 'Accetta Tutto',
    acceptSelected: 'Accetta Selezione',
    service: {
      purpose: 'Scopo',
      purposes: 'Scopi',
      required: 'sempre richiesto'
    },
    poweredBy: 'Powered by Klaro!'
  },
  en: {
    consentModal: {
      title: 'Cookie Management',
      description: 'This website uses Google Analytics to understand how visitors interact with our website and improve your browsing experience.'
    },
    privacyPolicy: {
      name: 'privacy policy',
      text: 'To learn more, please read our {privacyPolicy}.'
    },
    consentNotice: {
      title: 'We use cookies',
      description: 'This website uses technical cookies necessary for it to work, always active, and Google Analytics cookies to analyse site usage anonymously. You can accept or decline analytics cookies. The names, purposes and durations of all cookies are listed in our {privacyPolicy}.',
      learnMore: 'Customize',
      acceptAll: 'Accept',
      decline: 'Decline'
    },
    ok: 'Accept',
    save: 'Save',
    decline: 'Decline',
    close: 'Close',
    acceptAll: 'Accept',
    acceptSelected: 'Accept',
    service: {
      purpose: 'Purpose',
      purposes: 'Purposes',
      required: 'always required'
    },
    poweredBy: 'Powered by Klaro!'
  }
};

function buildKlaroConfig(instance, privacyPolicy) {
  return {
    version: 1,
    lang: 'it',
    translations,
    services: [
      {
        name: 'googleAnalytics',
        title: 'Google Analytics',
        purposes: ['analytics'],
        required: false,
        // Niente optOut: true. Con optOut Klaro tratta il servizio come gia' pre-approvato e
        // scatena callback(true) da solo al primo setup, prima di qualsiasi scelta dell'utente:
        // esattamente il consenso-fantasma che questo banner deve evitare.
        onlyOnce: true,
        default: false,
        // Pattern generico invece di interpolare l'id nel nome del cookie: al momento del setup
        // del banner il tracking id puo' non essere ancora risolto (arriva da generic-be via
        // rete), quindi un pattern costruito sull'id sarebbe congelato a '_gtag_GA_' e non
        // beccherebbe mai il cookie GA4 reale in fase di opt-out.
        cookies: [
          /^_ga/,
          /^_gid/,
          /^_gat/,
          /^_gtag_GA_/
        ],
        callback(consent) {
          if (consent) {
            // Delega interamente il caricamento/consenso all'istanza analytics: e' l'unica fonte
            // che conosce lo stato reale del tracking id e dello script gtag. Reimplementarlo qui
            // in parallelo e' la causa della race che poteva lasciare il tracciamento rotto per
            // tutta la sessione (due init concorrenti in corsa sullo stesso script).
            instance.initializeGoogleAnalytics();
            instance.afterInitialization(() => {
              instance.updateConsent({ analytics_storage: 'granted', ad_storage: 'granted' });
            });
          } else if (typeof window.gtag === 'function') {
            instance.updateConsent({ analytics_storage: 'denied', ad_storage: 'denied' });
          }
        }
      }
    ],
    styling: { theme: ['light'] },
    mustConsent: false,
    acceptAll: true,
    hideDeclineAll: false,
    hideLearnMore: false,
    noticeAsModal: false,
    modal: false,
    privacyPolicy,
    callback() {}
  };
}

// overrides: { privacyPolicy } - stringa o oggetto per-locale ({ it, en, default }), l'unica
// parte del banner che varia davvero da progetto a progetto.
export function createKlaroPlugin(instance, overrides = {}) {
  const { privacyPolicy = '/privacy-policy' } = overrides;

  return function install() {
    if (typeof window === 'undefined') {
      return;
    }

    const klaroConfig = buildKlaroConfig(instance, privacyPolicy);
    klaro.setup(klaroConfig);

    // Rendi Klaro disponibile globalmente. Serve anche la config: klaro.show()
    // senza argomenti ricade sulla config di default della libreria, che non ha
    // servizi, e non apre nulla.
    window.klaro = klaro;
    window.klaroConfig = klaroConfig;
  };
}
