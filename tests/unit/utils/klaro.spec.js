import { describe, expect, it, vi, beforeEach } from 'vitest';

import { createKlaroPlugin } from '@/utils/klaro.js';

vi.mock('klaro/dist/klaro-no-css', () => ({ setup: vi.fn() }));

const fakeInstance = (trackingId = null) => ({
  getTrackingId: vi.fn(() => trackingId),
  updateConsent: vi.fn()
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

  it('registra un unico servizio googleAnalytics con i pattern di cookie attesi', () => {
    createKlaroPlugin(fakeInstance('G-ABC123'))();

    const [service] = window.klaroConfig.services;
    expect(window.klaroConfig.services).toHaveLength(1);
    expect(service.name).toBe('googleAnalytics');
    expect(service.cookies).toContain('_gtag_GA_ABC123');
  });

  it('senza tracking id ancora risolto il pattern di cookie resta vuoto invece di rompersi', () => {
    createKlaroPlugin(fakeInstance(null))();

    const [service] = window.klaroConfig.services;
    expect(service.cookies).toContain('_gtag_GA_');
  });

  it('accettando il consenso, se gtag manca lo carica e configura da se\' il consenso', () => {
    const instance = fakeInstance('G-ABC123');
    createKlaroPlugin(instance)();

    const [service] = window.klaroConfig.services;
    service.callback(true);

    expect(document.querySelector('script[src*="googletagmanager.com"]')).not.toBeNull();
    expect(instance.updateConsent).toHaveBeenCalledWith({ analytics_storage: 'granted', ad_storage: 'granted' });
  });

  it('accettando il consenso con gtag gia\' presente, aggiorna subito senza ricaricare lo script', () => {
    window.gtag = vi.fn();
    const instance = fakeInstance('G-ABC123');
    createKlaroPlugin(instance)();

    const [service] = window.klaroConfig.services;
    service.callback(true);

    expect(document.querySelector('script[src*="googletagmanager.com"]')).toBeNull();
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
});
