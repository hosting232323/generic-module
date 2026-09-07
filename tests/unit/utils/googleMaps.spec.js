import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

const SCRIPT_ID = 'generic-module-google-maps';

// loadingPromise e' uno stato di modulo: senza reset un test che lascia un
// caricamento a meta' inquina quello dopo.
const importFresh = async () => {
  vi.resetModules();
  return import('@/utils/googleMaps.js');
};

beforeEach(() => {
  delete window.google;
  document.getElementById(SCRIPT_ID)?.remove();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('loadGoogleMaps', () => {
  it('risolve subito se Places e\' gia\' disponibile, senza iniettare lo script', async () => {
    const maps = { places: {} };
    window.google = { maps };
    const { loadGoogleMaps } = await importFresh();

    await expect(loadGoogleMaps()).resolves.toBe(maps);
    expect(document.getElementById(SCRIPT_ID)).toBeNull();
  });

  it('rifiuta se manca la chiave e non c\'e\' un caricamento in corso', async () => {
    const { loadGoogleMaps } = await importFresh();

    await expect(loadGoogleMaps()).rejects.toThrow('Google Maps API key mancante');
  });

  it('inietta lo script con chiave e libreria places, poi risolve quando Places e\' pronta', async () => {
    const { loadGoogleMaps } = await importFresh();

    const promise = loadGoogleMaps('LA-CHIAVE');

    const script = document.getElementById(SCRIPT_ID);
    expect(script).not.toBeNull();
    expect(script.src).toContain('key=LA-CHIAVE');
    expect(script.src).toContain('libraries=places');

    const importLibrary = vi.fn(async () => { window.google.maps.places = {}; });
    window.google = { maps: { importLibrary } };
    script.dispatchEvent(new Event('load'));

    await expect(promise).resolves.toBe(window.google.maps);
    expect(importLibrary).toHaveBeenCalledWith('places');
  });

  it('un secondo invito mentre carica restituisce la stessa promise', async () => {
    const { loadGoogleMaps } = await importFresh();

    const first = loadGoogleMaps('LA-CHIAVE');
    const second = loadGoogleMaps('LA-CHIAVE');

    expect(second).toBe(first);
  });

  it('riusa lo script gia\' presente in pagina invece di aggiungerne un altro', async () => {
    const existing = document.createElement('script');
    existing.id = SCRIPT_ID;
    document.head.appendChild(existing);

    const { loadGoogleMaps } = await importFresh();
    const promise = loadGoogleMaps('LA-CHIAVE');

    expect(document.querySelectorAll(`#${SCRIPT_ID}`)).toHaveLength(1);

    window.google = { maps: { places: {}, importLibrary: vi.fn() } };
    existing.dispatchEvent(new Event('load'));

    await expect(promise).resolves.toBe(window.google.maps);
  });

  it('propaga l\'errore di caricamento e libera il lock cosi\' un retry e\' possibile', async () => {
    const { loadGoogleMaps } = await importFresh();

    const failing = loadGoogleMaps('LA-CHIAVE');
    document.getElementById(SCRIPT_ID).dispatchEvent(new Event('error'));
    await expect(failing).rejects.toThrow('Caricamento di Google Maps fallito');

    document.getElementById(SCRIPT_ID).remove();
    const retry = loadGoogleMaps('LA-CHIAVE');
    window.google = { maps: { places: {}, importLibrary: vi.fn() } };
    document.getElementById(SCRIPT_ID).dispatchEvent(new Event('load'));

    await expect(retry).resolves.toBe(window.google.maps);
  });

  it('scade se Places non diventa disponibile entro il timeout', async () => {
    vi.useFakeTimers();
    const { loadGoogleMaps } = await importFresh();

    const promise = loadGoogleMaps('LA-CHIAVE');
    promise.catch(() => {});
    window.google = { maps: {} };
    document.getElementById(SCRIPT_ID).dispatchEvent(new Event('load'));

    await vi.advanceTimersByTimeAsync(10_500);

    await expect(promise).rejects.toThrow('Google Maps Places non disponibile');
  });
});
