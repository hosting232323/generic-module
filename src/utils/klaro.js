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

function enableGoogleAnalytics(instance) {
  const trackingId = instance.getTrackingId();

  if (window.gtag && typeof window.gtag === 'function') {
    instance.updateConsent({ analytics_storage: 'granted', ad_storage: 'granted' });
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());

  const waitForGtag = () => {
    if (typeof window.gtag !== 'function') {
      setTimeout(waitForGtag, 100);
      return;
    }

    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted'
    });
    window.gtag('config', trackingId, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
      cookie_domain: 'auto',
      session_timeout: 1800
    });
    instance.updateConsent({ analytics_storage: 'granted', ad_storage: 'granted' });
  };
  waitForGtag();
}

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
        optOut: true,
        onlyOnce: true,
        default: false,
        cookies: [
          /^_ga/,
          /^_gid/,
          /^_gat/,
          `_gtag_GA_${instance.getTrackingId()?.replace('G-', '') || ''}`
        ],
        callback(consent) {
          if (consent) {
            enableGoogleAnalytics(instance);
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
