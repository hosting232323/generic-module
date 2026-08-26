<template>
  <v-text-field
    ref="fieldRef"
    v-model="localValue"
    :label="label"
    :class="customClass"
    :rules="rules"
    :append-inner-icon="isCameback ? (showOtherLocation ? 'mdi-minus' : 'mdi-plus') : ''"
    autocomplete="off"
    clearable
    @update:model-value="onInput"
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
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
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
const PLACE_FIELDS = ['geometry', 'formatted_address', 'name', 'address_components'];
// Scegliendo dal menu di Google il blur arriva prima di place_changed: si
// aspetta la selezione invece di bocciare subito il testo digitato.
const BLUR_COMMIT_MS = 300;

const stripLatLng = (value) => (value ? value.split(' - LatLng')[0] : value);
const hasDistanceCheck = computed(() => props.origin && props.maxDistanceKm != null);

const fieldRef = ref(null);
const localValue = ref(stripLatLng(props.modelValue));
const isDistanceValid = ref(true);
const touched = ref(false);

let widget = null;
let geocoder = null;
let hasPlace = Boolean(props.modelValue);
let blurCommitId = null;

watch(
  () => props.modelValue,
  (newVal) => {
    const stripped = stripLatLng(newVal);
    if (stripped !== localValue.value) {
      localValue.value = stripped;
      hasPlace = Boolean(stripped);
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

const emitValidity = (isValid) => {
  emit('valid', isValid);
  emit('update:isValid', isValid);
  emit('update:is-valid', isValid);
};

const getComponent = (place, type, short = false) => {
  const found = (place.address_components || []).find((item) => item.types.includes(type));
  if (!found) return '';
  return short ? found.short_name : found.long_name;
};

const normalize = (value) => value.replace(/[\s,]+/g, ' ').trim().toLowerCase();

// Ricostruisce "Via Roma, 12, Bari, BA" leggendo i singoli componenti invece
// di ciclare sull'array: Google lo restituisce con il civico prima della via.
const buildLabel = (place) => {
  if (!props.formatted) return place.formatted_address || place.name || '';

  const road = getComponent(place, 'route');
  const street = [road, getComponent(place, 'street_number')].filter(Boolean).join(', ');
  const town =
    getComponent(place, 'locality') ||
    getComponent(place, 'administrative_area_level_3') ||
    getComponent(place, 'postal_town');
  const province = getComponent(place, 'administrative_area_level_2', true);

  // Il nome serve solo per i punti di interesse: per una via ripeterebbe la via
  // stessa, che e' il difetto che aveva il vecchio componente.
  const name = place.name && normalize(place.name) !== normalize(street) ? place.name : '';

  return [name, street, town, province].filter(Boolean).join(', ') || place.formatted_address || '';
};

const findPostalCode = (components) =>
  (components || []).find((component) => component.types.includes('postal_code'));

const getPostalCode = async (place) => {
  const component = findPostalCode(place.address_components);
  if (component) return component.long_name;
  if (!place.geometry?.location || !geocoder) return '';

  const results = await new Promise((resolve) => {
    geocoder.geocode({ location: place.geometry.location }, (res, status) =>
      resolve(status === 'OK' && res ? res : [])
    );
  });

  for (const result of results) {
    const found = findPostalCode(result.address_components);
    if (found) return found.long_name;
  }
  return '';
};

const onPlaceChanged = async () => {
  clearTimeout(blurCommitId);
  touched.value = true;

  const place = widget.getPlace();
  const location = place?.geometry?.location;

  if (!location) {
    hasPlace = false;
    isDistanceValid.value = true;
    emitValidity(false);
    return;
  }

  const label = buildLabel(place);
  hasPlace = true;
  localValue.value = label;

  const lat = location.lat();
  const lng = location.lng();

  if (hasDistanceCheck.value) {
    const withinDistance = isWithinDistance(lat, lng);
    isDistanceValid.value = withinDistance;
    emitValidity(withinDistance);
    emit('update:modelValue', withinDistance ? `${label} - LatLng ${lat}, ${lng}` : label);
    if (!withinDistance) return;
  } else {
    isDistanceValid.value = true;
    emitValidity(true);
    emit('update:modelValue', label);
  }

  emit('addressComponents', { address: label, cap: await getPostalCode(place) });
};

const onInput = (value) => {
  if (!hasPlace) return;
  // Il testo e' stato modificato a mano dopo una scelta valida: torna in dubbio
  // finche' non si ripesca un posto dal menu.
  hasPlace = false;
  isDistanceValid.value = true;
  emitValidity(false);
  emit('update:modelValue', value || '');
};

const onBlur = () => {
  touched.value = true;
  clearTimeout(blurCommitId);
  blurCommitId = setTimeout(() => {
    if (hasPlace) return;
    const current = localValue.value;
    if (!current) return;
    emitValidity(false);
    emit('update:modelValue', current);
  }, BLUR_COMMIT_MS);
};

const toggleOtherLocation = () => {
  const nextVal = !props.showOtherLocation;
  emit('update:showOtherLocation', nextVal);
  emit('update:show-other-location', nextVal);
};

onMounted(async () => {
  try {
    await loadGoogleMaps(props.apiKey);
  } catch {
    return;
  }

  const input = fieldRef.value?.$el.querySelector('input');
  if (!input) return;

  geocoder = new window.google.maps.Geocoder();
  widget = new window.google.maps.places.Autocomplete(input, {
    fields: PLACE_FIELDS,
    componentRestrictions: { country: COUNTRY }
  });
  widget.addListener('place_changed', onPlaceChanged);
});

onBeforeUnmount(() => {
  clearTimeout(blurCommitId);
  if (widget) window.google?.maps?.event?.clearInstanceListeners(widget);
});
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
