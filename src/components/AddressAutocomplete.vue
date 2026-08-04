<template>
  <v-combobox
    v-model="localValue"
    :label="label"
    :class="customClass"
    :items="suggestions"
    :rules="rules"
    no-filter
    clearable
    hide-no-data
    :hide-details="hasDistanceCheck ? (showCustomError ? false : 'true') : false"
    :append-inner-icon="isCameback ? (showOtherLocation ? 'mdi-minus' : 'mdi-plus') : ''"
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
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  },
  label: {
    type: String,
    required: true
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
    default: false
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
  'update:isValid',
  'addressComponents',
  'update:showOtherLocation'
]);

const NOMINATIM_URL = 'https://nominatim.fastsite.it';

// Nel combobox mostriamo solo l'indirizzo leggibile; quando c'e' il controllo
// distanza la coppia di coordinate viaggia nel valore emesso al parent col
// suffisso ' - LatLng lat, lng', che il backend (calcolatore_distanza) parsa.
const stripLatLng = (value) => (value ? value.split(' - LatLng')[0] : value);

const hasDistanceCheck = props.origin && props.maxDistanceKm != null;

const localValue = ref(stripLatLng(props.modelValue));
const suggestions = ref([]);
const results = new Map();
const isDistanceValid = ref(true);
const touched = ref(false);
let debounceId = null;

const extractHouseNumber = (query, road, town) => {
  if (!query) return '';
  let rest = ` ${query} `;
  [road, town].forEach((part) => {
    if (part)
      rest = rest.replace(new RegExp(part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), ' ');
  });
  rest = rest.replace(/\b\d{5}\b/g, ' ');
  const match = rest.match(/\b\d{1,4}(?:\s?(?:bis|ter))?(?:\s?[/-]?\s?[a-z])?\b/i);
  return match ? match[0].replace(/\s+/g, '').toUpperCase() : '';
};

const formatAddress = (address, query) => {
  const road =
    address.road ||
    address.pedestrian ||
    address.footway ||
    address.path ||
    address.cycleway ||
    '';
  const town =
    address.city ||
    address.town ||
    address.village ||
    address.hamlet ||
    address.municipality ||
    '';
  const houseNumber = address.house_number || extractHouseNumber(query, road, town);
  const street = [road, houseNumber].filter(Boolean).join(' ');
  const seen = new Set();
  return [street, town]
    .filter((part) => {
      if (!part) return false;
      const key = part.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .join(', ');
};

const buildLabel = (item, query) =>
  props.formatted ? formatAddress(item.address || {}, query) : item.display_name;

const onSearch = (query) => {
  emit('update:modelValue', query);
  if (hasDistanceCheck) {
    isDistanceValid.value = false;
    emit('update:isValid', false);
  }
  clearTimeout(debounceId);
  if (!query || query.length < 3) {
    suggestions.value = [];
    return;
  }
  debounceId = setTimeout(async () => {
    try {
      const res = await fetch(
        `${NOMINATIM_URL}/search?format=json&addressdetails=1&countrycodes=it&limit=5&q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      results.clear();
      const labels = [];
      data.forEach((item) => {
        const label = buildLabel(item, query);
        if (!label || results.has(label)) return;
        results.set(label, item);
        labels.push(label);
      });
      suggestions.value = labels;
    } catch {
      suggestions.value = [];
    }
  }, 400);
};

const onSelect = (value) => {
  const item = results.get(value);
  if (hasDistanceCheck) {
    if (!item) {
      isDistanceValid.value = false;
      emit('update:isValid', false);
      emit('update:modelValue', value);
      return;
    }
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);
    const withinDistance = isWithinDistance(lat, lng);
    localValue.value = value;
    isDistanceValid.value = withinDistance;
    emit('update:isValid', withinDistance);
    emit('update:modelValue', `${value} - LatLng ${lat}, ${lng}`);
    return;
  }
  emit('update:modelValue', value);
  emit('update:isValid', Boolean(item));
  if (item)
    emit('addressComponents', { address: value, cap: item.address?.postcode || '' });
};

const toggleOtherLocation = () => {
  emit('update:showOtherLocation', !props.showOtherLocation);
};

const onBlur = () => {
  touched.value = true;
};

const customErrors = computed(() => {
  const errors = [];
  if (!isDistanceValid.value && props.distanceErrorMessage)
    errors.push(props.distanceErrorMessage);
  props.rules.forEach((rule) => {
    const result = rule(localValue.value);
    if (result !== true) errors.push(result);
  });
  return errors;
});

const showCustomError = computed(
  () => hasDistanceCheck && touched.value && customErrors.value.length > 0
);

const isWithinDistance = (lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - props.origin.lat) * Math.PI) / 180;
  const dLon = ((lon2 - props.origin.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((props.origin.lat * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c < props.maxDistanceKm;
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
