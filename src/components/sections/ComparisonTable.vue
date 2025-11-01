<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'Tabella comparativa'"/>
    <v-card elevation="20" class="margin_top__default">
      <v-table :density="isMobile ? 'compact' : 'default'">
        <thead>
          <tr>
            <th class="text-left" :style="{ backgroundColor: info.primaryColor, color: '#FFFFFF' }">
              {{ getText(content.headerColumn) || '' }}
            </th>
            <th
              v-for="(header, index) in content.headers"
              :key="index"
              class="text-center"
              :style="{ backgroundColor: info.primaryColor, color: '#FFFFFF' }"
              v-html="getText(header)"
            />
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in content.rows" :key="rowIndex">
            <td class="font-weight-bold" v-html="getText(row.label)"/>
            <td
              v-for="(value, colIndex) in row.values"
              :key="colIndex"
              class="text-center"
            >
              <v-icon v-if="value === true" icon="mdi-check" :color="info.primaryColor"/>
              <v-icon v-else-if="value === false" icon="mdi-close" color="grey"/>
              <span v-else v-html="getText(value)"/>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import { setupMobileUtils } from '@/utils/mobile';

const isMobile = setupMobileUtils();
const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);
</script>
