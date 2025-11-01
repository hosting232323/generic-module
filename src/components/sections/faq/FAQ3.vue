<template>
  <v-container>
    <v-row v-if="info?.title" justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-list class="faq-list">
          <template v-for="(item, index) in content" :key="index">
            <v-list-item class="faq-item" @click="toggleItem(index)">
              <template v-slot:prepend>
                <v-icon :color="activeIndex === index ? 'primary' : 'default'">
                  {{ activeIndex === index ? 'mdi-minus-circle' : 'mdi-plus-circle' }}
                </v-icon>
              </template>
              <v-list-item-title class="text-h6 font-weight-bold">{{ getText(item.question) }}</v-list-item-title>
            </v-list-item>
            <v-expand-transition>
              <div v-show="activeIndex === index" class="faq-answer">
                <p class="text-body-1">{{ getText(item.answer) }}</p>
              </div>
            </v-expand-transition>
            <v-divider v-if="index < content.length - 1"></v-divider>
          </template>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useLanguageStore } from '@/stores/language';

defineProps({
  content: Array,
  info: Object
});

const { getText } = useLanguageStore();

const activeIndex = ref(null);

const toggleItem = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<style scoped>
.faq-list {
  background: transparent;
}

.faq-item {
  cursor: pointer;
  padding: 24px 16px;
  transition: background 0.3s;
}

.faq-item:hover {
  background: rgba(var(--v-theme-on-surface), 0.04);
}

.faq-answer {
  padding: 0 72px 24px 72px;
  color: rgba(var(--v-theme-on-surface), 0.7);
}
</style>
