<template>
  <v-container class="team-section">
    <v-row v-if="info?.title" justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4" :style="{ color: info.primaryColor }">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
        <div class="title-underline" :style="{ background: `linear-gradient(90deg, transparent, ${info.primaryColor}, transparent)` }"></div>
      </v-col>
    </v-row>
    <v-list class="margin_top__default">
      <v-list-item
        v-for="(member, index) in content"
        :key="index"
        class="team-list-item mb-6"
        elevation="4"
      >
        <template v-slot:prepend>
          <div class="avatar-wrapper">
            <v-avatar size="100" class="team-avatar">
              <v-img :src="member.image"/>
            </v-avatar>
            <div class="avatar-ring" :style="{ borderColor: info.primaryColor }"></div>
          </div>
        </template>
        <v-list-item-title class="text-h5 mb-2" :style="{ color: info.primaryColor }">
          <b v-html="getText(member.name)"/>
        </v-list-item-title>
        <v-list-item-subtitle class="text-h6 mb-2 member-role">
          <span v-html="getText(member.role)"/>
        </v-list-item-subtitle>
        <v-list-item-subtitle class="text-wrap mb-3">
          <p v-if="member.bio" v-html="getText(member.bio)"/>
        </v-list-item-subtitle>
        <template v-slot:append v-if="member.social">
          <div class="d-flex flex-column gap-2">
            <v-btn
              v-for="(social, idx) in member.social"
              :key="idx"
              :icon="social.icon"
              :href="social.url"
              target="_blank"
              :color="info.primaryColor"
              variant="text"
              size="small"
              class="social-btn"
            />
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);
</script>

<style scoped>
.team-section {
  padding: 60px 0;
}

.title-underline {
  width: 200px;
  height: 4px;
  margin: 20px auto 0;
  border-radius: 2px;
}

.team-list-item {
  padding: 30px;
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
  border-left: 4px solid transparent;
  position: relative;
  overflow: hidden;
}

.team-list-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, rgba(214, 52, 71, 0.05) 0%, transparent 100%);
  transition: width 0.4s ease;
}

.team-list-item:hover {
  transform: translateX(10px) translateY(-5px);
  box-shadow: 0 12px 40px rgba(214, 52, 71, 0.15);
  border-left-color: currentColor;
}

.team-list-item:hover::before {
  width: 100%;
}

.avatar-wrapper {
  position: relative;
  padding: 5px;
}

.team-avatar {
  transition: all 0.3s ease;
}

.avatar-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 110px;
  height: 110px;
  border: 3px solid;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s ease;
}

.team-list-item:hover .avatar-ring {
  opacity: 1;
  transform: scale(1);
}

.team-list-item:hover .team-avatar {
  transform: scale(1.05);
}

.member-role {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem !important;
}

.social-btn {
  transition: all 0.3s ease;
}

.social-btn:hover {
  transform: scale(1.2) rotate(5deg);
}

.text-wrap {
  white-space: normal;
  line-height: 1.6;
}

.gap-2 {
  gap: 8px;
}
</style>
