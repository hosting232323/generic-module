<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'Il nostro team'"/>
    <v-row class="margin_top__default">
      <v-col
        v-for="(member, index) in content.members"
        :key="index"
        cols="12"
        sm="6"
        :md="content.columns || 3"
      >
        <v-card elevation="10" class="team-card">
          <v-img :src="resolveImg(member.image)" :height="isMobile ? 250 : 350" cover/>
          <v-card-title class="text-center" v-html="getText(member.name)"/>
          <v-card-subtitle class="text-center" v-html="getText(member.role)"/>
          <v-card-text v-if="member.description" class="text-center">
            <p v-html="getText(member.description)"/>
          </v-card-text>
          <v-card-actions v-if="member.socials" class="justify-center pb-4">
            <v-btn
              v-for="(social, idx) in member.socials"
              :key="idx"
              :icon="social.icon"
              :href="social.url"
              target="_blank"
              variant="text"
              :color="info.primaryColor"
            />
          </v-card-actions>
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
.team-card {
  transition: transform 0.3s ease;
}
.team-card:hover {
  transform: scale(1.05);
}
</style>
