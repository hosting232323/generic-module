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

const NOMINATIM_URL = 'https://nominatim.fastsite.it';

const stripLatLng = (value) => (value ? value.split(' - LatLng')[0] : value);
const hasDistanceCheck = computed(() => props.origin && props.maxDistanceKm != null);

const localValue = ref(stripLatLng(props.modelValue));
const searchQuery = ref(stripLatLng(props.modelValue) || '');
const suggestions = ref([]);
const results = new Map();
const isDistanceValid = ref(true);
const touched = ref(false);
let debounceId = null;

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

const extractHouseNumber = (query, road, town) => {
  if (!query) return '';
  let rest = ` ${query} `;
  [road, town].forEach((part) => {
    if (part)
      rest = rest.replace(new RegExp(part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), ' ');
  });
  rest = rest.replace(/\b\d{5}\b/g, ' '); // scarta il CAP
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
  clearTimeout(debounceId);
  if (!query || query.length < 3) {
    suggestions.value = [];
    return;
  }
  debounceId = setTimeout(async () => {
    try {
      const url = `${NOMINATIM_URL}/search?format=json&addressdetails=1&countrycodes=it&limit=5&q=${encodeURIComponent(query)}`;
      const res = await fetch(url);
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

const emitValidity = (isValid) => {
  emit('valid', isValid);
  emit('update:isValid', isValid);
  emit('update:is-valid', isValid);
};

const onSelect = (value) => {
  touched.value = true;
  if (!value) {
    localValue.value = '';
    isDistanceValid.value = true;
    emit('update:modelValue', '');
    emitValidity(false);
    return;
  }
  const cleanValue = stripLatLng(value);
  localValue.value = cleanValue;
  searchQuery.value = cleanValue;

  const item = results.get(cleanValue) || results.get(value);

  if (hasDistanceCheck.value) {
    if (!item) {
      isDistanceValid.value = false;
      emitValidity(false);
      emit('update:modelValue', cleanValue);
      return;
    }
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);
    const withinDistance = isWithinDistance(lat, lng);
    isDistanceValid.value = withinDistance;
    emitValidity(withinDistance);

    const emittedValue = withinDistance
      ? `${cleanValue} - LatLng ${lat}, ${lng}`
      : cleanValue;
    emit('update:modelValue', emittedValue);
    if (withinDistance) {
      emit('addressComponents', { address: cleanValue, cap: item.address?.postcode || '' });
    }
    return;
  }

  const isValid = Boolean(item);
  isDistanceValid.value = true;
  emitValidity(isValid);
  emit('update:modelValue', cleanValue);
  if (item) {
    emit('addressComponents', { address: cleanValue, cap: item.address?.postcode || '' });
  }
};

const onBlur = () => {
  touched.value = true;
  const current = searchQuery.value || localValue.value;
  if (current && current !== props.modelValue) {
    onSelect(current);
  }
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
