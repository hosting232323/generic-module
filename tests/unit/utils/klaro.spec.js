import { describe, expect, it, vi, beforeEach } from 'vitest';

import { createKlaroPlugin } from '@/utils/klaro.js';

vi.mock('klaro/dist/klaro-no-css', () => ({ setup: vi.fn() }));

const fakeInstance = (trackingId = null) => ({
  getTrackingId: vi.fn(() => trackingId),
  updateConsent: vi.fn(),
  initializeGoogleAnalytics: vi.fn(),
  afterInitialization: vi.fn(callback => Promise.resolve().then(callback))
});

beforeEach(async () => {
  delete window.gtag;
  delete window.dataLayer;
  delete window.klaro;
  delete window.klaroConfig;
  document.querySelectorAll('script[src*="googletagmanager.com"]').forEach(script => script.remove());
  const klaro = await import('klaro/dist/klaro-no-css');
  klaro.setup.mockClear();
});

describe('createKlaroPlugin', () => {
  it('inizializza klaro e lo espone globalmente insieme alla config usata', async () => {
    const instance = fakeInstance();
    const plugin = createKlaroPlugin(instance);
    plugin();

    const klaro = await import('klaro/dist/klaro-no-css');
    expect(klaro.setup).toHaveBeenCalledTimes(1);
    expect(window.klaro).toBeDefined();
    expect(window.klaroConfig).toBe(klaro.setup.mock.calls[0][0]);
  });

  it('usa /privacy-policy come default e accetta un override', async () => {
    createKlaroPlugin(fakeInstance())();
    expect(window.klaroConfig.privacyPolicy).toBe('/privacy-policy');

    createKlaroPlugin(fakeInstance(), { privacyPolicy: '/privacy' })();
    expect(window.klaroConfig.privacyPolicy).toBe('/privacy');

    const perLocale = { it: '/privacy-policy/it', en: '/privacy-policy/en', default: '/privacy-policy/it' };
    createKlaroPlugin(fakeInstance(), { privacyPolicy: perLocale })();
    expect(window.klaroConfig.privacyPolicy).toBe(perLocale);
  });

  it('registra un unico servizio googleAnalytics con pattern di cookie generici per qualunque id GA4', () => {
    createKlaroPlugin(fakeInstance('G-ABC123'))();

    const [service] = window.klaroConfig.services;
    expect(window.klaroConfig.services).toHaveLength(1);
    expect(service.name).toBe('googleAnalytics');
    expect(service.cookies.some(pattern => pattern instanceof RegExp && pattern.test('_gtag_GA_ABC123'))).toBe(true);
  });

  it('il pattern dei cookie GA4 funziona anche prima che il tracking id sia risolto', () => {
    createKlaroPlugin(fakeInstance(null))();

    const [service] = window.klaroConfig.services;
    expect(service.cookies.some(pattern => pattern instanceof RegExp && pattern.test('_gtag_GA_XYZ789'))).toBe(true);
  });

  it('il servizio non e\' opt-out: klaro non deve poterlo attivare da solo senza scelta dell\'utente', () => {
    const instance = fakeInstance('G-ABC123');
    createKlaroPlugin(instance)();

    const [service] = window.klaroConfig.services;
    expect(service.optOut).not.toBe(true);
    expect(instance.initializeGoogleAnalytics).not.toHaveBeenCalled();
    expect(instance.updateConsent).not.toHaveBeenCalled();
  });

  it('accettando il consenso, delega il caricamento all\'istanza e concede il consenso a inizializzazione conclusa', async () => {
    const instance = fakeInstance('G-ABC123');
    createKlaroPlugin(instance)();

    const [service] = window.klaroConfig.services;
    service.callback(true);

    expect(instance.initializeGoogleAnalytics).toHaveBeenCalledTimes(1);
    expect(instance.updateConsent).not.toHaveBeenCalled();

    await Promise.resolve();
    await Promise.resolve();

    expect(instance.updateConsent).toHaveBeenCalledWith({ analytics_storage: 'granted', ad_storage: 'granted' });
  });

  it('rifiutando il consenso con gtag disponibile, lo nega', () => {
    window.gtag = vi.fn();
    const instance = fakeInstance('G-ABC123');
    createKlaroPlugin(instance)();

    const [service] = window.klaroConfig.services;
    service.callback(false);

    expect(instance.updateConsent).toHaveBeenCalledWith({ analytics_storage: 'denied', ad_storage: 'denied' });
  });

  it('rifiutando il consenso senza gtag disponibile, non fa nulla', () => {
    const instance = fakeInstance('G-ABC123');
    createKlaroPlugin(instance)();

    const [service] = window.klaroConfig.services;
    service.callback(false);

    expect(instance.updateConsent).not.toHaveBeenCalled();
  });

  it('la callback globale della config e\' un no-op innocuo', () => {
    createKlaroPlugin(fakeInstance())();

    expect(typeof window.klaroConfig.callback).toBe('function');
    expect(() => window.klaroConfig.callback()).not.toThrow();
  });

  it('in SSR (senza window) l\'install e\' un no-op e non chiama klaro.setup', async () => {
    const klaro = await import('klaro/dist/klaro-no-css');

    try {
      vi.stubGlobal('window', undefined);
      createKlaroPlugin(fakeInstance())();
    } finally {
      vi.unstubAllGlobals();
    }

    expect(klaro.setup).not.toHaveBeenCalled();
  });
});
