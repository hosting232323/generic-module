<template>
  <div>
    <v-fab-transition>
      <v-btn
        class="position-fixed"
        location="bottom end"
        style="bottom: 24px; left: 24px; z-index: 10"
        icon
        color="primary"
        @click="fabOpen = true"
      >
        <v-icon>mdi-filter-variant</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-dialog v-model="fabOpen" persistent max-width="400">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">Filtra per allergeni</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <AllergenFilter
            :allergens="allergens"
            :model-value="modelValue"
            @update:modelValue="updateValue"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="modelValue.length" text color="error" @click="clearAll">Reset</v-btn>
          <v-btn text @click="fabOpen = false">Chiudi</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AllergenFilter from '@/components/menu/AllergenFilter.vue'

const props = defineProps({
  allergens: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])
const fabOpen = ref(false)

function updateValue(newValue) {
  emit('update:modelValue', newValue)
}

function clearAll() {
  emit('update:modelValue', [])
}
</script>
