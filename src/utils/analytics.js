/* global gtag, dataLayer */
export const GA_CONFIG = {
  trackingId: null,

  settings: {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
    cookie_domain: 'auto',
    session_timeout: 1800,
    custom_map: {
      custom_parameter: 'dimension1',
    },
  },

  consentMode: {
    default: {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted',
    },

    regions: {
      EU: {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      },
      US: {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      },
    },
  },

  defaultEvents: {
    page_view: true,
    scroll: true,
    outbound_clicks: true,
    site_search: true,
    video_engagement: true,
    file_downloads: true,
    scroll_threshold: 90,
    outbound_domains: [],
    download_extensions: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'zip', 'rar'],
  },

  ecommerce: {
    enabled: false,
    currency: 'EUR',
  },

  debug: import.meta.env.MODE === 'development',
};

export function getTrackingId() {
  return import.meta.env.VITE_GA_TRACKING_ID;
}

export function isAnalyticsEnabled() {
  const id = getTrackingId();
  const hasTrackingId = !!id && id.startsWith('G-');
  const disabled = import.meta.env.VITE_DISABLE_ANALYTICS === 'true';
  return hasTrackingId && !disabled;
}

export function loadGoogleAnalytics() {
  const trackingId = getTrackingId();

  if (!isAnalyticsEnabled()) {
    return;
  }

  if (document.querySelector('script[src*="googletagmanager.com"]')) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    dataLayer.push(arguments);
  };

  gtag('js', new Date());
}

export function initConsentMode() {
  if (!window.gtag) {
    return;
  }

  gtag('consent', 'default', GA_CONFIG.consentMode.default);

  Object.entries(GA_CONFIG.consentMode.regions || {}).forEach(
    ([region, settings]) => {
      gtag('consent', 'default', { region: [region], ...settings });
    }
  );
}

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

export function initializeGoogleAnalytics() {
  if (!isAnalyticsEnabled()) {
    console.warn('[GA] initializeGoogleAnalytics: analytics non abilitato, stop');
    return;
  }

  loadGoogleAnalytics();

  initConsentMode();
  configureGoogleAnalytics();
}

export function updateConsent(consentSettings) {
  if (!window.gtag || typeof window.gtag !== 'function') {
    console.warn('[GA] updateConsent: gtag non pronto, riprovo tra 100ms');
    setTimeout(() => updateConsent(consentSettings), 100);
    return;
  }

  gtag('consent', 'update', consentSettings);
}
