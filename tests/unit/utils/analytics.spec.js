import { describe, expect, it, vi, beforeEach } from 'vitest';

import { createAnalytics, createAnalyticsPlugin } from '@/utils/analytics.js';

const trackingResponse = (measurementId) => ({
  json: async () => ({ status: 'ok', data: { measurement_id: measurementId } })
});

beforeEach(() => {
  delete window.gtag;
  delete window.dataLayer;
  document.querySelectorAll('script[src*="googletagmanager.com"]').forEach(script => script.remove());
});

describe('resolveTrackingId', () => {
  it('chiede il measurement id a generic-be e lo espone via getTrackingId', async () => {
    global.fetch = vi.fn(async (url) => {
      expect(String(url)).toBe('https://api.example/analytics/tracking?project=sito.it');
      return trackingResponse('G-ABC123');
    });

    const instance = createAnalytics({ genericHostname: 'https://api.example', projectName: 'sito.it' });
    await instance.resolveTrackingId();

    expect(instance.getTrackingId()).toBe('G-ABC123');
  });

  it('senza genericHostname non chiama la rete e resta senza id', async () => {
    global.fetch = vi.fn();

    const instance = createAnalytics({ projectName: 'sito.it' });
    const id = await instance.resolveTrackingId();

    expect(fetch).not.toHaveBeenCalled();
    expect(id).toBeNull();
  });

  it('un fetch che va in errore lascia il tracking id invariato', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('rete giu\'')));

    const instance = createAnalytics({ genericHostname: 'https://api.example', projectName: 'sito.it' });
    const id = await instance.resolveTrackingId();

    expect(id).toBeNull();
  });

  it('un backend lento non lascia la promise pendente oltre il timeout configurato', async () => {
    global.fetch = vi.fn((url, { signal }) => new Promise((resolve, reject) => {
      signal.addEventListener('abort', () => reject(new Error('aborted')));
    }));

    const instance = createAnalytics({
      genericHostname: 'https://api.example',
      projectName: 'sito.it',
      requestTimeout: 10
    });
    const id = await instance.resolveTrackingId();

    expect(id).toBeNull();
  });

  it('aggiunge lo slash finale all\'hostname quando manca', async () => {
    global.fetch = vi.fn(async (url) => {
      expect(String(url)).toContain('https://api.example/analytics/tracking');
      return trackingResponse('G-ABC123');
    });

    const instance = createAnalytics({ genericHostname: 'https://api.example', projectName: 'sito.it' });
    await instance.resolveTrackingId();
  });
});

describe('projectName di default', () => {
  it('deriva il progetto dall\'hostname corrente, togliendo www. e test.', async () => {
    const originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      value: { hostname: 'test.www.sito.it' },
      configurable: true
    });

    global.fetch = vi.fn(async (url) => {
      expect(String(url)).toContain('project=sito.it');
      return trackingResponse('G-ABC123');
    });

    try {
      const instance = createAnalytics({ genericHostname: 'https://api.example' });
      await instance.resolveTrackingId();

      expect(fetch).toHaveBeenCalledTimes(1);
    } finally {
      Object.defineProperty(window, 'location', { value: originalLocation, configurable: true });
    }
  });
});

describe('isAnalyticsEnabled', () => {
  it('e\' falso finche\' il tracking id non e\' stato risolto', () => {
    const instance = createAnalytics({ projectName: 'sito.it' });
    expect(instance.isAnalyticsEnabled()).toBe(false);
  });

  it('e\' vero con un measurement id valido e disabled non impostato', async () => {
    global.fetch = vi.fn(async () => trackingResponse('G-ABC123'));

    const instance = createAnalytics({ genericHostname: 'https://api.example', projectName: 'sito.it' });
    await instance.resolveTrackingId();

    expect(instance.isAnalyticsEnabled()).toBe(true);
  });

  it('resta falso quando disabled e\' esplicito, anche con un id valido', async () => {
    global.fetch = vi.fn(async () => trackingResponse('G-ABC123'));

    const instance = createAnalytics({
      genericHostname: 'https://api.example',
      projectName: 'sito.it',
      disabled: true
    });
    await instance.resolveTrackingId();

    expect(instance.isAnalyticsEnabled()).toBe(false);
  });

  it('rifiuta un id che non comincia per G-', async () => {
    global.fetch = vi.fn(async () => trackingResponse('UA-12345'));

    const instance = createAnalytics({ genericHostname: 'https://api.example', projectName: 'sito.it' });
    await instance.resolveTrackingId();

    expect(instance.isAnalyticsEnabled()).toBe(false);
  });
});

describe('initializeGoogleAnalytics / afterInitialization', () => {
  it('afterInitialization aspetta la risoluzione prima di eseguire il callback', async () => {
    global.fetch = vi.fn(async () => trackingResponse('G-ABC123'));

    const instance = createAnalytics({ genericHostname: 'https://api.example', projectName: 'sito.it' });
    instance.initializeGoogleAnalytics();

    const callback = vi.fn();
    await instance.afterInitialization(callback);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('senza init precedente, il callback parte comunque', async () => {
    const instance = createAnalytics({ projectName: 'sito.it' });
    const callback = vi.fn(() => 'valore');

    const result = await instance.afterInitialization(callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(result).toBe('valore');
  });

  it('carica lo script gtag solo quando il tracciamento e\' abilitato', async () => {
    global.fetch = vi.fn(async () => trackingResponse('G-ABC123'));

    const instance = createAnalytics({ genericHostname: 'https://api.example', projectName: 'sito.it' });
    await instance.initializeGoogleAnalytics();

    expect(document.querySelector('script[src*="googletagmanager.com"]')).not.toBeNull();
  });

  it('non tocca il DOM quando il tracciamento resta disabilitato', async () => {
    global.fetch = vi.fn();

    const instance = createAnalytics({ projectName: 'sito.it' });
    await instance.initializeGoogleAnalytics();

    expect(document.querySelector('script[src*="googletagmanager.com"]')).toBeNull();
  });

  it('non duplica lo script se e\' gia\' presente in pagina', async () => {
    global.fetch = vi.fn(async () => trackingResponse('G-ABC123'));

    const instance = createAnalytics({ genericHostname: 'https://api.example', projectName: 'sito.it' });
    await instance.initializeGoogleAnalytics();
    await instance.initializeGoogleAnalytics();

    expect(document.querySelectorAll('script[src*="googletagmanager.com"]')).toHaveLength(1);
  });

  it('configura consent mode e gtag config una volta che lo script e\' pronto', async () => {
    vi.useFakeTimers();
    global.fetch = vi.fn(async () => trackingResponse('G-ABC123'));

    const instance = createAnalytics({ genericHostname: 'https://api.example', projectName: 'sito.it' });
    const init = instance.initializeGoogleAnalytics();

    await vi.advanceTimersByTimeAsync(1000);
    await init;

    // window.gtag e' lo stub creato da loadGoogleAnalytics, che accoda ogni chiamata in dataLayer:
    // e' l'unico modo per osservare cosa initConsentMode/configureGoogleAnalytics gli hanno passato.
    const calls = window.dataLayer.map(args => Array.from(args));
    expect(calls).toContainEqual(['consent', 'default', expect.objectContaining({ analytics_storage: 'denied' })]);
    expect(calls).toContainEqual(['config', 'G-ABC123', expect.objectContaining({ anonymize_ip: true })]);

    vi.useRealTimers();
  });
});

describe('updateConsent', () => {
  it('aggiorna il consenso quando gtag e\' gia\' disponibile', () => {
    window.gtag = vi.fn();

    const instance = createAnalytics({ projectName: 'sito.it' });
    instance.updateConsent({ analytics_storage: 'granted' });

    expect(window.gtag).toHaveBeenCalledWith('consent', 'update', { analytics_storage: 'granted' });
  });

  it('riprova finche\' gtag non compare', async () => {
    vi.useFakeTimers();
    const instance = createAnalytics({ projectName: 'sito.it' });

    instance.updateConsent({ analytics_storage: 'granted' });
    expect(window.gtag).toBeUndefined();

    window.gtag = vi.fn();
    await vi.advanceTimersByTimeAsync(150);

    expect(window.gtag).toHaveBeenCalledWith('consent', 'update', { analytics_storage: 'granted' });
    vi.useRealTimers();
  });
});

describe('analytics.trackPageView/trackEvent/trackPurchase', () => {
  it('non chiama gtag quando il tracciamento e\' disabilitato', () => {
    window.gtag = vi.fn();
    const instance = createAnalytics({ projectName: 'sito.it' });

    instance.analytics.trackPageView('/home', 'Home');
    instance.analytics.trackEvent('click');
    instance.analytics.trackPurchase('t1', [], 10);

    expect(window.gtag).not.toHaveBeenCalled();
  });

  it('traccia pageview, evento e acquisto quando abilitato', async () => {
    global.fetch = vi.fn(async () => trackingResponse('G-ABC123'));
    window.gtag = vi.fn();

    const instance = createAnalytics({ genericHostname: 'https://api.example', projectName: 'sito.it' });
    await instance.resolveTrackingId();

    instance.analytics.trackPageView('/home', 'Home');
    expect(window.gtag).toHaveBeenCalledWith('config', 'G-ABC123', { page_path: '/home', page_title: 'Home' });

    instance.analytics.trackEvent('signup', { label: 'newsletter' });
    expect(window.gtag).toHaveBeenCalledWith('event', 'signup', expect.objectContaining({
      event_category: 'engagement',
      event_label: 'newsletter'
    }));

    instance.analytics.trackPurchase('t1', [{ id: 'p1' }], 42);
    expect(window.gtag).toHaveBeenCalledWith('event', 'purchase', {
      transaction_id: 't1',
      value: 42,
      currency: 'EUR',
      items: [{ id: 'p1' }]
    });
  });

  it('usa la valuta configurata come default per trackPurchase', async () => {
    global.fetch = vi.fn(async () => trackingResponse('G-ABC123'));
    window.gtag = vi.fn();

    const instance = createAnalytics({
      genericHostname: 'https://api.example',
      projectName: 'sito.it',
      ecommerceCurrency: 'USD'
    });
    await instance.resolveTrackingId();

    instance.analytics.trackPurchase('t1', [], 42);
    expect(window.gtag).toHaveBeenCalledWith('event', 'purchase', expect.objectContaining({ currency: 'USD' }));
  });

  it('setUserProperty e setAnalyticsEnabled parlano con gtag secondo le regole attese', async () => {
    global.fetch = vi.fn(async () => trackingResponse('G-ABC123'));
    window.gtag = vi.fn();

    const instance = createAnalytics({ genericHostname: 'https://api.example', projectName: 'sito.it' });
    await instance.resolveTrackingId();

    instance.analytics.setUserProperty('plan', 'pro');
    expect(window.gtag).toHaveBeenCalledWith('set', { plan: 'pro' });

    instance.analytics.setAnalyticsEnabled(false);
    expect(window.gtag).toHaveBeenCalledWith('consent', 'update', { analytics_storage: 'denied' });
  });

  it('getTrackingId e isEnabled rispecchiano lo stato dell\'istanza', async () => {
    global.fetch = vi.fn(async () => trackingResponse('G-ABC123'));

    const instance = createAnalytics({ genericHostname: 'https://api.example', projectName: 'sito.it' });
    await instance.resolveTrackingId();

    expect(instance.analytics.getTrackingId()).toBe('G-ABC123');
    expect(instance.analytics.isEnabled()).toBe(true);
  });
});

describe('createAnalyticsPlugin', () => {
  it('inizializza il tracciamento ed espone $analytics/provide sull\'app', () => {
    global.fetch = vi.fn(async () => trackingResponse('G-ABC123'));

    const instance = createAnalytics({ genericHostname: 'https://api.example', projectName: 'sito.it' });
    const plugin = createAnalyticsPlugin(instance);

    const app = { config: { globalProperties: {} }, provide: vi.fn() };
    plugin(app);

    expect(app.config.globalProperties.$analytics).toBe(instance.analytics);
    expect(app.provide).toHaveBeenCalledWith('analytics', instance.analytics);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
