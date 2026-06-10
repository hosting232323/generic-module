/* global gtag, dataLayer */
// Configurazione Google Analytics
export const GA_CONFIG = {
  // ID di tracciamento Google Analytics (solo da variabile d'ambiente)
  trackingId: null,

  // Configurazioni generali
  settings: {
    // Anonimizza gli IP per la privacy
    anonymize_ip: true,

    // Flag dei cookie per la sicurezza
    cookie_flags: 'SameSite=None;Secure',

    // Dominio personalizzato (opzionale)
    cookie_domain: 'auto',

    // Durata della sessione in secondi (30 minuti)
    session_timeout: 1800,

    // Mappa personalizzata per parametri custom
    custom_map: {
      custom_parameter: 'dimension1',
    },
  },

  // Configurazione Consent Mode
  consentMode: {
    // Stato di default (tutti negati per GDPR compliance)
    default: {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted',
    },

    // Regioni con regole specifiche
    regions: {
      // Per paesi UE con GDPR
      EU: {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      },
      // Per paesi senza GDPR (esempio)
      US: {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      },
    },
  },

  // Eventi predefiniti da tracciare
  defaultEvents: {
    // Traccia automaticamente questi eventi
    page_view: true,
    scroll: true,
    outbound_clicks: true,
    site_search: true,
    video_engagement: true,
    file_downloads: true,

    // Configurazione eventi specifici
    scroll_threshold: 90, // Percentuale di scroll da tracciare
    outbound_domains: [], // Domini esterni da tracciare come click esterni
    download_extensions: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'zip', 'rar'],
  },

  // Enhanced ecommerce
  ecommerce: {
    enabled: false,
    currency: 'EUR',
    // Altri parametri e-commerce se necessari
  },

  // Debug mode (attivare solo in sviluppo)
  debug: import.meta.env.MODE === 'development',
};

// Funzione per ottenere l'ID di tracciamento solo dall'ambiente
export function getTrackingId() {
  return import.meta.env.VITE_GA_TRACKING_ID;
}

// Funzione per verificare se analytics è abilitato
export function isAnalyticsEnabled() {
  const hasTrackingId = getTrackingId() && getTrackingId().startsWith('G-');
  const notDisabled = !import.meta.env.VITE_DISABLE_ANALYTICS;

  return hasTrackingId && notDisabled;
}

// Funzione per caricare dinamicamente lo script di Google Analytics
export function loadGoogleAnalytics() {
  const trackingId = getTrackingId();

  if (!isAnalyticsEnabled()) {
    return;
  }

  // Verifica se lo script è già stato caricato
  if (document.querySelector('script[src*="googletagmanager.com"]')) {
    return;
  }

  // Crea e aggiunge lo script gtag
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
}

// Funzione per inizializzare il Consent Mode
export function initConsentMode() {
  if (!window.gtag) {
    return;
  }

  // Inizializza il consent mode con le impostazioni di default
  gtag('consent', 'default', GA_CONFIG.consentMode.default);

  // Configura le regioni specifiche se presenti
  Object.entries(GA_CONFIG.consentMode.regions || {}).forEach(
    ([region, settings]) => {
      gtag('consent', 'default', {
        region: [region],
        ...settings,
      });
    }
  );
}

// Funzione per configurare Google Analytics
export function configureGoogleAnalytics() {
  if (!window.gtag) {
    return;
  }

  const trackingId = getTrackingId();

  gtag('config', trackingId, {
    ...GA_CONFIG.settings,
    debug_mode: GA_CONFIG.debug,
  });
}

// Funzione principale per inizializzare tutto Google Analytics
export function initializeGoogleAnalytics() {
  if (!isAnalyticsEnabled()) {
    return;
  }

  // Carica lo script
  loadGoogleAnalytics();

  // Funzione per configurare GA quando lo script è pronto
  const configureGA = () => {
    if (typeof window.gtag === 'function') {
      initConsentMode();
      configureGoogleAnalytics();
    } else {
      setTimeout(configureGA, 100);
    }
  };

  // Aspetta che lo script sia caricato prima di configurare
  setTimeout(configureGA, 1000);
}

// Funzione per aggiornare il consenso
export function updateConsent(consentSettings) {
  if (!window.gtag || typeof window.gtag !== 'function') {
    setTimeout(() => updateConsent(consentSettings), 100);
    return;
  }

  gtag('consent', 'update', consentSettings);
}
