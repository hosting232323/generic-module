const SCRIPT_ID = 'generic-module-google-maps';
const READY_POLL_MS = 100;
const READY_TIMEOUT_MS = 10000;

let loadingPromise = null;

const isReady = () => Boolean(window.google?.maps?.places);

const waitForPlaces = async () => {
  if (window.google?.maps?.importLibrary) await window.google.maps.importLibrary('places');

  const deadline = Date.now() + READY_TIMEOUT_MS;
  while (!isReady()) {
    if (Date.now() > deadline) throw new Error('Google Maps Places non disponibile');
    await new Promise((resolve) => setTimeout(resolve, READY_POLL_MS));
  }
  return window.google.maps;
};

const appendScript = (apiKey) => {
  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.async = true;
  script.defer = true;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
  document.head.appendChild(script);
  return script;
};

/**
 * Carica una sola volta il bootstrap di Google Maps e risolve quando la
 * libreria Places e' utilizzabile. La chiave arriva dall'app che consuma il
 * modulo: qui non si puo' leggere import.meta.env, il dist e' pre-buildato.
 */
export const loadGoogleMaps = (apiKey) => {
  if (isReady()) return Promise.resolve(window.google.maps);
  if (loadingPromise) return loadingPromise;
  if (!apiKey) return Promise.reject(new Error('Google Maps API key mancante'));

  loadingPromise = new Promise((resolve, reject) => {
    const script = document.getElementById(SCRIPT_ID) || appendScript(apiKey);
    script.addEventListener('load', () => resolve());
    script.addEventListener('error', () => reject(new Error('Caricamento di Google Maps fallito')));
  })
    .then(waitForPlaces)
    .catch((error) => {
      loadingPromise = null;
      throw error;
    });

  return loadingPromise;
};

export default { loadGoogleMaps };
