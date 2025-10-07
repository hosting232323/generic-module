<template>
  <div
    v-if="allergens?.length"
    class="d-flex flex-wrap px-3 pb-3"
  >
    <v-chip
      v-for="a in allergens"
      :key="a"
      class="ma-1"
      style="padding: 5px 10px 5px 0;"
      size="small"
      :color="allergenIcons[a['it']]?.color"
      :text-color="allergenIcons[a['it']]?.color"
      outlined
    >
      <v-avatar
        left
        size="25"
        class="me-1"
        tile
      >
        <v-img
          :src="allergenIcons[a['it']]?.src"
          alt="Icona allergene"
          cover
        />
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
</script>
