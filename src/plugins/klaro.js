/* global gtag, dataLayer */
import * as klaro from 'klaro/dist/klaro-no-css';
import 'klaro/dist/klaro.css';
import { getTrackingId, updateConsent } from '@/utils/analytics';

// Configurazione Klaro per il cookie banner
const klaroConfig = {
  version: 1,

  // Lingue disponibili
  lang: 'it',
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
      },
      poweredBy: 'Powered by Klaro!',
    },
  },

  // Configurazione servizi
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
        `_gtag_GA_${getTrackingId()?.replace('G-', '') || ''}`,
      ],
      callback: function (consent) {
        if (consent) {
          // Abilita Google Analytics

          // Forza l'inizializzazione di GA quando l'utente dà il consenso
          const trackingId = getTrackingId();

          if (!window.gtag || typeof window.gtag !== 'function') {
            // Carica manualmente lo script GA
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
            document.head.appendChild(script);

            // Inizializza gtag
            window.dataLayer = window.dataLayer || [];
            window.gtag = function () {
              dataLayer.push(arguments);
            };

            // Configura gtag
            gtag('js', new Date());

            // Aspetta che gtag sia disponibile prima di aggiornare il consenso
            const waitForGtag = () => {
              if (typeof window.gtag === 'function') {
                // Inizializza il consent mode
                gtag('consent', 'default', {
                  analytics_storage: 'denied',
                  ad_storage: 'denied',
                  functionality_storage: 'denied',
                  personalization_storage: 'denied',
                  security_storage: 'granted',
                });

                // Configura GA
                gtag('config', trackingId, {
                  anonymize_ip: true,
                  cookie_flags: 'SameSite=None;Secure',
                  cookie_domain: 'auto',
                  session_timeout: 1800,
                });

                // Aggiorna il consenso
                updateConsent({
                  analytics_storage: 'granted',
                  ad_storage: 'granted',
                });
              } else {
                setTimeout(waitForGtag, 100);
              }
            };
            waitForGtag();
          } else {
            // gtag è già disponibile, aggiorna direttamente
            updateConsent({
              analytics_storage: 'granted',
              ad_storage: 'granted',
            });
          }
        } else {
          // Disabilita Google Analytics
          if (typeof window.gtag === 'function') {
            updateConsent({
              analytics_storage: 'denied',
              ad_storage: 'denied',
            });
          }
        }
      },
    },
  ],

  // Styling
  styling: {
    theme: ['light'],
  },

  // Comportamento
  mustConsent: false,
  acceptAll: true,
  hideDeclineAll: false,
  hideLearnMore: false,
  noticeAsModal: false,

  modal: false,

  // Impostazioni privacy
  privacyPolicy: '/privacy',

  // Callback globali
  callback: function () {},
};

export default function () {
  // Inizializza Klaro con la configurazione
  if (typeof window !== 'undefined') {
    klaro.setup(klaroConfig);

    // Rendi Klaro disponibile globalmente
    window.klaro = klaro;
  }
}
