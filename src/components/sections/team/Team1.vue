<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor, textAlign: 'center' }" v-html="getText(content.title)"/>
    <v-row class="margin_top__default">
      <v-col
        v-for="(member, index) in content.members"
        :key="index"
        cols="12"
        sm="6"
        :md="content.columns || 3"
      >
        <v-card elevation="15" class="team-card-flip">
          <div class="team-card-inner">
            <div class="team-card-front">
              <v-img :src="resolveImg(member.image)" :height="isMobile ? 300 : 400" cover/>
              <v-card-title class="text-center pa-4" :style="{ backgroundColor: info.primaryColor, color: '#FFFFFF' }">
                <div>
                  <div class="text-h6" v-html="getText(member.name)"/>
                  <div class="text-caption" v-html="getText(member.role)"/>
                </div>
              </v-card-title>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import { setupMobileUtils, resolveImg } from '@/utils/mobile';

const isMobile = setupMobileUtils();
const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);
</script>

<style scoped>
.team-card-flip {
  transition: transform 0.3s ease;
  cursor: pointer;
}
.team-card-flip:hover {
  transform: scale(1.05);
}
.team-card-inner {
  position: relative;
}
.team-card-front {
  backface-visibility: hidden;
}
</style>
