<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'Orari di apertura'"/>
    <v-card elevation="20" class="margin_top__default">
      <v-card-text>
        <v-list>
          <v-list-item
            v-for="(schedule, index) in content.schedules"
            :key="index"
            class="schedule-item"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-clock-outline" :color="info.primaryColor"/>
            </template>
            <v-list-item-title class="font-weight-bold" v-html="getText(schedule.day)"/>
            <v-list-item-subtitle>
              <span v-if="schedule.closed" class="text-grey">{{ getText('Chiuso') || 'Chiuso' }}</span>
              <span v-else v-html="getText(schedule.hours)"/>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <v-divider v-if="content.notes" class="my-4"/>
        <div v-if="content.notes" class="px-4">
          <p class="text-caption text-grey" v-html="getText(content.notes)"/>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);
</script>

<style scoped>
.schedule-item {
  padding: 12px 16px;
}
</style>
