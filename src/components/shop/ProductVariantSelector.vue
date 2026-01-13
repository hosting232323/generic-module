<template>
  <v-container style="padding-top: 0 !important; padding-bottom: 0 !important;">
    <div v-if="variants && variants.length > 0">
      <v-divider class="mb-3" />

      <strong style="font-size: 14px;">{{ getText(store.content?.size) || 'Taglie' }}</strong>

      <div class="d-flex flex-wrap mt-3">
        <v-chip v-for="variant in variants" :key="variant.name" class="ma-1" pill :disabled="!variant.quantity"
          :color="selectedVariant === variant ? info.primaryColor : info.secondaryColor"
          @click="selectVariant(variant)">
          {{ variant.name }}
        </v-chip>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import { useLanguageStore } from '@/stores/language';

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);
const { getText } = useLanguageStore();

const info = data.value.info;
const store = data.value.store;

const props = defineProps({
  variants: { type: Array, required: true }
});

const selectedVariant = ref(null);

const emit = defineEmits(['update:selectedVariant']);
const selectVariant = (variant) => {
  selectedVariant.value = variant;
  emit('update:selectedVariant', variant);
}
</script>
