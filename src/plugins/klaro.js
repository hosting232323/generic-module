import * as klaro from 'klaro/dist/klaro-no-css';
import 'klaro/dist/klaro.css';
import { updateConsent, isAnalyticsEnabled } from '@/utils/analytics';
import { useLanguageStore } from '@/stores/language';

const getKlaroConfig = (lang = 'it') => {
  const services = [];

  if (isAnalyticsEnabled()) {
    services.push({
      name: 'googleAnalytics',
      title: 'Google Analytics',
      purposes: ['analytics'],
      required: false,
      optOut: true,
      onlyOnce: true,
      default: false,
      cookies: [/^_ga/, /^_gid/, /^_gat/],
      callback: function (consent) {
        updateConsent({
          analytics_storage: consent ? 'granted' : 'denied',
          ad_storage: consent ? 'granted' : 'denied',
        });
      },
    });
  }

  return {
    version: 1,
    lang: lang,
    translations: {
      it: {
        consentModal: {
          title: 'Gestione dei Cookie',
          description:
            'Questo sito web utilizza Google Analytics per comprendere come i visitatori interagiscono con il nostro sito web e migliorare la tua esperienza di navigazione.',
          privacyPolicy: {
            name: 'privacy policy',
            text: 'Per saperne di più, leggi la nostra {privacyPolicy}.',
          },
        },
        consentNotice: {
          description:
            'Utilizziamo Google Analytics per analizzare in forma anonima l’uso del sito e migliorare i nostri contenuti e servizi. Puoi decidere se autorizzare o meno l’utilizzo di questi cookie analitici.',
          learnMore: 'Personalizza',
          acceptAll: 'Accetta',
          decline: 'Rifiuta',
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
          required: 'sempre richiesto',
        },
        poweredBy: 'Powered by Klaro!',
      },
      en: {
        consentModal: {
          title: 'Cookie Management',
          description:
            'This website uses Google Analytics to understand how visitors interact with our website and improve your browsing experience.',
          privacyPolicy: {
            name: 'privacy policy',
            text: 'To learn more, please read our {privacyPolicy}.',
          },
        },
        consentNotice: {
          title: 'We use cookies',
          description:
            'This website uses Google Analytics for analytical purposes. You can accept or decline analytics cookies.',
          learnMore: 'Customize',
          acceptAll: 'Accept',
          decline: 'Decline',
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
          required: 'always required',
          googleAnalytics: {
            description: 'Google Analytics is used for anonymous analysis of site usage.',
          }
        },
        poweredBy: 'Powered by Klaro!',
      },
    },

    services: services,

    styling: {
      theme: ['light'],
    },

    mustConsent: false,
    acceptAll: true,
    hideDeclineAll: false,
    hideLearnMore: false,
    noticeAsModal: false,
    modal: false,

    privacyPolicy: '/privacy',
  };
};

export default function (app) {
  if (typeof window !== 'undefined') {
    const languageStore = useLanguageStore();
    const config = getKlaroConfig(languageStore.locale);

    klaro.setup(config);

    window.klaro = klaro;
    if (app) {
      app.provide('klaro', klaro);
    }
  }
}
