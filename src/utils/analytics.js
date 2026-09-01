const DEFAULT_REQUEST_TIMEOUT = 5000;
const DEFAULT_ECOMMERCE_CURRENCY = 'EUR';

const GA_SETTINGS = {
  anonymize_ip: true,
  cookie_flags: 'SameSite=None;Secure',
  cookie_domain: 'auto',
  session_timeout: 1800
};

const CONSENT_DEFAULT = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  security_storage: 'granted'
};

// Via anche il prefisso dell'ambiente di test (test.<dominio>, come da deploy_test), altrimenti
// il nome non corrisponde a nessun progetto su generic-be e il tracciamento resta muto senza dirlo.
const stripEnvironmentPrefix = (hostname) => hostname.replace(/^(?:www\.|test\.)+/, '');

// config: { genericHostname, projectName, disabled, requestTimeout, ecommerceCurrency, debug }
// genericHostname e' l'host dove gira generic-be: per i siti il cui backend prodotto e' un altro
// (es. wooffy-be), il chiamante passa un env var dedicato invece di VITE_HOSTNAME.
export function createAnalytics(config = {}) {
  const {
    genericHostname,
    projectName = typeof window !== 'undefined' ? stripEnvironmentPrefix(window.location.hostname) : '',
    disabled = false,
    requestTimeout = DEFAULT_REQUEST_TIMEOUT,
    ecommerceCurrency = DEFAULT_ECOMMERCE_CURRENCY,
    debug = false
  } = config;

  // ID di tracciamento: unica fonte e' generic-be, che lo restituisce dopo la creazione della
  // property GA4 dal pannello. Nessuna variabile di build, nessuna ricompilazione del sito.
  let runtimeTrackingId = null;

  // L'init passa dalla rete, quindi non e' piu' istantaneo: qui si tiene la sua promessa perche'
  // chi traccia (il pageview di atterraggio) possa aspettarla invece di perdere l'evento.
  let initialization = null;

  const getTrackingId = () => runtimeTrackingId;

  async function resolveTrackingId() {
    if (!genericHostname) {
      return getTrackingId();
    }

    const base = genericHostname.endsWith('/') ? genericHostname : `${genericHostname}/`;

    // Senza tetto, un backend lento lascia la promise pendente per sempre: il catch non scatta
    // e per tutta la sessione il sito non traccia nulla. Meglio rinunciare all'ID che restare appesi.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), requestTimeout);

    try {
      const response = await fetch(
        `${base}analytics/tracking?project=${encodeURIComponent(projectName)}`,
        { signal: controller.signal }
      );
      const data = await response.json();

      if (data.status == 'ok' && data.data.measurement_id) {
        runtimeTrackingId = data.data.measurement_id;
      }
    } catch {
      return getTrackingId();
    } finally {
      clearTimeout(timeout);
    }

    return getTrackingId();
  }

  function isAnalyticsEnabled() {
    const id = getTrackingId();
    return !!id && id.startsWith('G-') && !disabled;
  }

  function loadGoogleAnalytics() {
    if (!isAnalyticsEnabled()) {
      return;
    }

    if (document.querySelector('script[src*="googletagmanager.com"]')) {
      return;
    }

    const trackingId = getTrackingId();
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
  }

  function initConsentMode() {
    if (!window.gtag) {
      return;
    }

    window.gtag('consent', 'default', CONSENT_DEFAULT);
  }

  function configureGoogleAnalytics() {
    if (!window.gtag) {
      return;
    }

    window.gtag('config', getTrackingId(), { ...GA_SETTINGS, debug_mode: debug });
  }

  async function runInitialization() {
    await resolveTrackingId();

    if (!isAnalyticsEnabled()) {
      return;
    }

    loadGoogleAnalytics();

    const configureGA = () => {
      if (typeof window.gtag === 'function') {
        initConsentMode();
        configureGoogleAnalytics();
      } else {
        setTimeout(configureGA, 100);
      }
    };

    setTimeout(configureGA, 1000);
  }

  // Idempotente: puo' essere chiamata sia dal plugin Vue all'avvio sia dal banner Klaro
  // alla decisione dell'utente senza rifare la resolveTrackingId() e senza ricreare la
  // promise che afterInitialization() sta gia' osservando altrove.
  function initializeGoogleAnalytics() {
    if (!initialization) {
      initialization = runInitialization();
    }
    return initialization;
  }

  // Esegue il callback a inizializzazione conclusa: prima l'ID non e' ancora risolto e
  // isAnalyticsEnabled() risponde di no, quindi l'evento verrebbe scartato in silenzio.
  function afterInitialization(callback) {
    return initialization ? initialization.then(callback) : Promise.resolve(callback());
  }

  function updateConsent(consentSettings) {
    if (!window.gtag || typeof window.gtag !== 'function') {
      setTimeout(() => updateConsent(consentSettings), 100);
      return;
    }

    window.gtag('consent', 'update', consentSettings);
  }

  const analytics = {
    trackPageView(pagePath, pageTitle) {
      if (typeof window.gtag !== 'undefined' && isAnalyticsEnabled()) {
        window.gtag('config', getTrackingId(), { page_path: pagePath, page_title: pageTitle });
      }
    },

    trackEvent(eventName, parameters = {}) {
      if (typeof window.gtag !== 'undefined' && isAnalyticsEnabled()) {
        window.gtag('event', eventName, {
          event_category: parameters.category || 'engagement',
          event_label: parameters.label,
          value: parameters.value,
          ...parameters
        });
      }
    },

    trackPurchase(transactionId, items, value, currency = ecommerceCurrency) {
      if (typeof window.gtag !== 'undefined' && isAnalyticsEnabled()) {
        window.gtag('event', 'purchase', { transaction_id: transactionId, value, currency, items });
      }
    },

    setUserProperty(propertyName, value) {
      if (typeof window.gtag !== 'undefined' && isAnalyticsEnabled()) {
        window.gtag('set', { [propertyName]: value });
      }
    },

    setAnalyticsEnabled(enabled) {
      if (typeof window.gtag !== 'undefined') {
        window.gtag('consent', 'update', { analytics_storage: enabled ? 'granted' : 'denied' });
      }
    },

    getTrackingId,
    isEnabled: isAnalyticsEnabled
  };

  return {
    getTrackingId,
    resolveTrackingId,
    isAnalyticsEnabled,
    initializeGoogleAnalytics,
    afterInitialization,
    updateConsent,
    analytics
  };
}

// Plugin Vue: inizializza il tracciamento al load ed espone $analytics / inject('analytics').
export function createAnalyticsPlugin(instance) {
  return function install(app) {
    if (typeof window === 'undefined') {
      return;
    }

    instance.initializeGoogleAnalytics();
    app.config.globalProperties.$analytics = instance.analytics;
    app.provide('analytics', instance.analytics);
  };
}
