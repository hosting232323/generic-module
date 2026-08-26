<template>
  <v-autocomplete
    v-model="localValue"
    v-model:search="searchQuery"
    :label="label"
    :class="customClass"
    :rules="rules"
    :items="suggestions"
    :custom-filter="customFilter"
    :append-inner-icon="isCameback ? (showOtherLocation ? 'mdi-minus' : 'mdi-plus') : ''"
    no-filter
    clearable
    hide-no-data
    @update:search="onSearch"
    @update:model-value="onSelect"
    @blur="onBlur"
    @click:append-inner="toggleOtherLocation"
  />
  <div
    v-if="showCustomError"
    class="error-message"
  >
    <span
      v-for="msg in customErrors"
      :key="msg"
    >{{ msg }}</span>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { loadGoogleMaps } from '@/utils/googleMaps';

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  },
  label: {
    type: String,
    required: true
  },
  apiKey: {
    type: String,
    default: ''
  },
  rules: {
    type: Array,
    default: () => []
  },
  customClass: {
    type: String,
    default: ''
  },
  formatted: {
    type: Boolean,
    default: true
  },
  origin: {
    type: Object,
    default: null
  },
  maxDistanceKm: {
    type: Number,
    default: null
  },
  distanceErrorMessage: {
    type: String,
    default: ''
  },
  isCameback: {
    type: Boolean,
    default: false
  },
  showOtherLocation: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits([
  'update:modelValue',
  'addressComponents',
  'valid',
  'update:isValid',
  'update:is-valid',
  'update:showOtherLocation',
  'update:show-other-location'
]);

const COUNTRY = 'it';
const BLUR_COMMIT_MS = 250;

const stripLatLng = (value) => (value ? value.split(' - LatLng')[0] : value);
const hasDistanceCheck = computed(() => props.origin && props.maxDistanceKm != null);

const localValue = ref(stripLatLng(props.modelValue));
const searchQuery = ref(stripLatLng(props.modelValue) || '');
const suggestions = ref([]);
const predictions = new Map();
const detailsCache = new Map();
const isDistanceValid = ref(true);
const touched = ref(false);
let debounceId = null;
let sessionToken = null;
let services = null;
let blurCommitId = null;

const customFilter = () => true;

watch(
  () => props.modelValue,
  (newVal) => {
    const stripped = stripLatLng(newVal);
    if (stripped !== localValue.value) {
      localValue.value = stripped;
      searchQuery.value = stripped || '';
    }
  }
);

const isWithinDistance = (lat2, lon2) => {
  if (!props.origin || props.maxDistanceKm == null) return true;
  const R = 6371;
  const dLat = ((lat2 - props.origin.lat) * Math.PI) / 180;
  const dLon = ((lon2 - (props.origin.lng || props.origin.lon)) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((props.origin.lat * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c <= props.maxDistanceKm;
};

const customErrors = computed(() => {
  const errors = [];
  if (!isDistanceValid.value && props.distanceErrorMessage) {
    errors.push(props.distanceErrorMessage);
  }
  props.rules.forEach((rule) => {
    const result = rule(localValue.value);
    if (result !== true && typeof result === 'string') {
      errors.push(result);
    }
  });
  return errors;
});

const showCustomError = computed(
  () => hasDistanceCheck.value && (!isDistanceValid.value || (touched.value && customErrors.value.length > 0))
);

const getServices = async () => {
  if (services) return services;
  await loadGoogleMaps(props.apiKey);
  const maps = window.google.maps;
  services = {
    autocomplete: new maps.places.AutocompleteService(),
    details: new maps.places.PlacesService(document.createElement('div')),
    geocoder: new maps.Geocoder(),
    status: maps.places.PlacesServiceStatus,
    newSessionToken: () => new maps.places.AutocompleteSessionToken()
  };
  return services;
};

// Un solo session token per l'intera digitazione: si chiude sul dettaglio del
// posto scelto, cosi' le predizioni non vengono fatturate una per battuta.
const getSessionToken = async () => {
  const { newSessionToken } = await getServices();
  if (!sessionToken) sessionToken = newSessionToken();
  return sessionToken;
};

const fetchPredictions = async (input) => {
  const { autocomplete, status } = await getServices();
  const sessionTokenValue = await getSessionToken();
  return new Promise((resolve) => {
    autocomplete.getPlacePredictions(
      {
        input,
        sessionToken: sessionTokenValue,
        componentRestrictions: { country: COUNTRY }
      },
      (results, requestStatus) =>
        resolve(requestStatus === status.OK && results ? results : [])
    );
  });
};

const fetchDetails = async (prediction) => {
  if (detailsCache.has(prediction.place_id)) return detailsCache.get(prediction.place_id);

  const { details, status } = await getServices();
  const sessionTokenValue = await getSessionToken();
  const place = await new Promise((resolve) => {
    details.getDetails(
      {
        placeId: prediction.place_id,
        sessionToken: sessionTokenValue,
        fields: ['geometry', 'address_components', 'formatted_address', 'name']
      },
      (result, requestStatus) => resolve(requestStatus === status.OK ? result : null)
    );
  });

  sessionToken = null;
  if (place) detailsCache.set(prediction.place_id, place);
  return place;
};

const findPostalCode = (components) =>
  (components || []).find((component) => component.types.includes('postal_code'));

const getPostalCode = async (place) => {
  const component = findPostalCode(place?.address_components);
  if (component) return component.long_name;
  if (!place?.geometry?.location) return '';

  const { geocoder } = await getServices();
  const results = await new Promise((resolve) => {
    geocoder.geocode({ location: place.geometry.location }, (res, requestStatus) =>
      resolve(requestStatus === 'OK' && res ? res : [])
    );
  });

  for (const result of results) {
    const found = findPostalCode(result.address_components);
    if (found) return found.long_name;
  }
  return '';
};

// I termini della predizione sono gia' spezzati da Google
// ("Via Roma", "12", "Bari", "BA", "Italia"): basta togliere il paese.
const buildLabel = (prediction) => {
  if (!props.formatted) return prediction.description;
  const terms = (prediction.terms || []).map((term) => term.value);
  const parts = /^itali/i.test(terms[terms.length - 1] || '') ? terms.slice(0, -1) : terms;
  return parts.join(', ') || prediction.description;
};

const onSearch = (query) => {
  clearTimeout(debounceId);
  if (!query || query.length < 3) {
    suggestions.value = [];
    return;
  }
  debounceId = setTimeout(async () => {
    try {
      const results = await fetchPredictions(query);
      predictions.clear();
      const labels = [];
      results.forEach((prediction) => {
        const label = buildLabel(prediction);
        if (!label || predictions.has(label)) return;
        predictions.set(label, prediction);
        labels.push(label);
      });
      suggestions.value = labels;
    } catch {
      suggestions.value = [];
    }
  }, 400);
};

const emitValidity = (isValid) => {
  emit('valid', isValid);
  emit('update:isValid', isValid);
  emit('update:is-valid', isValid);
};

const onSelect = async (value) => {
  clearTimeout(blurCommitId);
  touched.value = true;
  if (!value) {
    localValue.value = '';
    isDistanceValid.value = true;
    sessionToken = null;
    emit('update:modelValue', '');
    emitValidity(false);
    return;
  }
  const cleanValue = stripLatLng(value);
  localValue.value = cleanValue;
  searchQuery.value = cleanValue;

  const prediction = predictions.get(cleanValue) || predictions.get(value);
  const place = prediction ? await fetchDetails(prediction) : null;
  const location = place?.geometry?.location;

  if (hasDistanceCheck.value) {
    if (!location) {
      isDistanceValid.value = false;
      emitValidity(false);
      emit('update:modelValue', cleanValue);
      return;
    }
    const lat = location.lat();
    const lng = location.lng();
    const withinDistance = isWithinDistance(lat, lng);
    isDistanceValid.value = withinDistance;
    emitValidity(withinDistance);

    const emittedValue = withinDistance
      ? `${cleanValue} - LatLng ${lat}, ${lng}`
      : cleanValue;
    emit('update:modelValue', emittedValue);
    if (withinDistance) {
      emit('addressComponents', { address: cleanValue, cap: await getPostalCode(place) });
    }
    return;
  }

  const isValid = Boolean(place);
  isDistanceValid.value = true;
  emitValidity(isValid);
  emit('update:modelValue', cleanValue);
  if (place) {
    emit('addressComponents', { address: cleanValue, cap: await getPostalCode(place) });
  }
};

// Il click su un suggerimento sfoca l'input prima che Vuetify emetta la
// selezione: committare subito il testo digitato chiuderebbe il menu e
// farebbe perdere la scelta. Si concede una finestra, e onSelect annulla
// il commit non appena la selezione arriva.
const onBlur = () => {
  touched.value = true;
  clearTimeout(blurCommitId);
  blurCommitId = setTimeout(() => {
    const current = searchQuery.value || localValue.value;
    if (current && current !== stripLatLng(props.modelValue)) {
      onSelect(current);
    }
  }, BLUR_COMMIT_MS);
};

const toggleOtherLocation = () => {
  const nextVal = !props.showOtherLocation;
  emit('update:showOtherLocation', nextVal);
  emit('update:show-other-location', nextVal);
};
</script>

<style scoped>
.error-message {
  color: #B00020;
  font-size: 12px;
  padding: 6px 16px;
  margin-bottom: -20px;
  display: block;
  white-space: normal;
  word-wrap: break-word;
}
</style>
