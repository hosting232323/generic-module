<template>
  <v-container>
    <v-slide-group>
      <v-slide-group-item v-for="brand in content.brands">
        <v-card :height="isMobile ? 150 : 300" :width="isMobile ? 150 : 300" class="brand_item" >
          <v-img :src="brand" />
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-container>
</template>

<script setup>
import { useMobileUtils } from '@/utils/mobile';

const { isMobile } = useMobileUtils();
const { content, info } = defineProps(['content', 'info']);
</script>

<style scoped>
.brand_item {
  margin-right: 25px;
  border: 0px
}
</style>