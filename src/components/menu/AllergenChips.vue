<template>
  <div class="d-flex flex-wrap px-3 pb-3" v-if="allergens?.length">
    <v-chip
      v-for="(a, index) in allergens"
      :key="index"
      class="ma-1"
      style="padding: 5px 10px 5px 0;"
      size="small"
      :color="getAllergenKey(a) && allergenIcons[getAllergenKey(a)]?.color"
      :text-color="getAllergenKey(a) && allergenIcons[getAllergenKey(a)]?.color"
      outlined
    >
      <v-avatar left size="25" class="me-1" tile>
        <v-img :src="getAllergenKey(a) && allergenIcons[getAllergenKey(a)]?.src" alt="Icona allergene" cover />
      </v-avatar>
      {{ formatAllergenName(getText(a)) }}
    </v-chip>
  </div>
</template>

<script setup>
import { allergenIcons, formatAllergenName } from '@/utils/allergens';
import { useLanguageStore } from '@/stores/language';

const { getText } = useLanguageStore();

const props = defineProps({
  allergens: {
    type: Array,
    required: true
  }
});

const getAllergenKey = (allergen) => {
  if (typeof allergen === 'string') return allergen;
  if (allergen && allergen.it) return allergen.it;
  return null;
};
</script>
