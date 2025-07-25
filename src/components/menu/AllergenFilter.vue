<template>
  <div class="d-flex flex-wrap px-3 pb-3" v-if="allergens?.length">
    <v-chip
      v-for="a in allergens"
      :key="a"
      class="ma-1 chip-wrapper"
      style="padding: 5px 10px 5px 0; position: relative;"
      size="medium"
      :color="isSelected(a) ? allergenIcons[a]?.color : undefined"
      :text-color="isSelected(a) ? 'white' : allergenIcons[a]?.color"
      @click="toggleSelection(a)"
    >
      <v-avatar left size="30" class="me-1" tile>
        <v-img :src="allergenIcons[a]?.src" alt="Icona allergene" cover />
      </v-avatar>
      {{ formatAllergenName(a) }}
    </v-chip>
  </div>
</template>

<script setup>
import { allergenIcons, formatAllergenName } from '@/utils/allergens'

const props = defineProps({
  allergens: Array,
  modelValue: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['update:modelValue'])

function isSelected(a) {
  return props.modelValue.includes(a)
}

function toggleSelection(a) {
  const newSelection = isSelected(a)
    ? props.modelValue.filter(x => x !== a)
    : [...props.modelValue, a]

  emit('update:modelValue', newSelection)
}
</script>

<style scoped>
.chip-wrapper {
  cursor: pointer;
}
.chip-wrapper:hover {
  opacity: 1 !important;
}
</style>
