<template>
  <div class="d-flex flex-wrap px-3 pb-3" v-if="allergens?.length">
    <v-chip
      v-for="a in allergens"
      :key="a"
      class="ma-1"
      style="padding: 5px 10px 5px 0;"
      size="small"
      :color="allergenIcons[a]?.color"
      :text-color="allergenIcons[a]?.color"
      outlined
    >
      <v-avatar left size="25" class="me-1" tile>
        <v-img :src="allergenIcons[a]?.src" alt="Icona allergene" cover />
      </v-avatar>
      {{ formatAllergenName(a) }}
    </v-chip>
  </div>
</template>

<script setup>
import { allergenIcons, formatAllergenName } from '@/utils/allergens';

const props = defineProps({
  allergens: {
    type: Array,
    required: true
  }
});
</script>
