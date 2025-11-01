<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'Processi'"/>
    <v-row class="margin_top__default">
      <v-col
        v-for="(step, index) in content.steps"
        :key="index"
        cols="12"
        :md="12 / (content.steps.length > 4 ? 4 : content.steps.length)"
        class="text-center"
      >
        <div class="process-step">
          <div class="step-number" :style="{ backgroundColor: info.primaryColor, color: '#FFFFFF' }">
            {{ index + 1 }}
          </div>
          <v-icon
            v-if="step.icon"
            :icon="step.icon"
            :color="info.primaryColor"
            size="60"
            class="my-4"
          />
          <h3 class="mb-3" v-html="getText(step.title)"/>
          <p v-html="getText(step.description)"/>
        </div>
        <v-icon
          v-if="index < content.steps.length - 1 && !isMobile"
          icon="mdi-arrow-right"
          :color="info.primaryColor"
          size="40"
          class="process-arrow"
        />
        <v-icon
          v-if="index < content.steps.length - 1 && isMobile"
          icon="mdi-arrow-down"
          :color="info.primaryColor"
          size="40"
          class="my-4"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import { setupMobileUtils } from '@/utils/mobile';

const isMobile = setupMobileUtils();
const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);
</script>

<style scoped>
.process-step {
  position: relative;
  padding: 20px;
}
.step-number {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
.process-arrow {
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
