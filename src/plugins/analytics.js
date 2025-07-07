import {
  GA_CONFIG,
  getTrackingId,
  isAnalyticsEnabled,
  initializeGoogleAnalytics,
} from '@/utils/analytics';

// Plugin per Google Analytics
const GA_TRACKING_ID = getTrackingId();

// Funzione per inizializzare Google Analytics con consent mode
function initializeAnalytics() {
  if (!isAnalyticsEnabled()) {
    return;
  }

  // Usa la funzione di inizializzazione centralizzata
  initializeGoogleAnalytics();
}

// Funzioni utility per il tracking
export const analytics = {
  // Track page views
  trackPageView(pagePath, pageTitle) {
    if (typeof window.gtag !== 'undefined' && isAnalyticsEnabled()) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }
  },

  // Track custom events
  trackEvent(eventName, parameters = {}) {
    if (typeof window.gtag !== 'undefined' && isAnalyticsEnabled()) {
      window.gtag('event', eventName, {
        event_category: parameters.category || 'engagement',
        event_label: parameters.label,
        value: parameters.value,
        ...parameters,
      });
    }
  },

  // Track ecommerce events
  trackPurchase(
    transactionId,
    items,
    value,
    currency = GA_CONFIG.ecommerce.currency
  ) {
    if (typeof window.gtag !== 'undefined' && isAnalyticsEnabled()) {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: value,
        currency: currency,
        items: items,
      });
    }
  },

  // Set user properties
  setUserProperty(propertyName, value) {
    if (typeof window.gtag !== 'undefined' && isAnalyticsEnabled()) {
      window.gtag('set', {
        [propertyName]: value,
      });
    }
  },

  // Enable/disable analytics
  setAnalyticsEnabled(enabled) {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('consent', 'update', {
        analytics_storage: enabled ? 'granted' : 'denied',
      });
    }
  },

  // Get current tracking ID
  getTrackingId() {
    return GA_TRACKING_ID;
  },

  // Check if analytics is enabled
  isEnabled() {
    return isAnalyticsEnabled();
  },
};

export default function (app) {
  // Inizializza Google Analytics quando il plugin viene caricato
  if (typeof window !== 'undefined') {
    initializeAnalytics();

    // Aggiungi le funzioni analytics globalmente all'app Vue
    app.config.globalProperties.$analytics = analytics;
    app.provide('analytics', analytics);
  }
}
