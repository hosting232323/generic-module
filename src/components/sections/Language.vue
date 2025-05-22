<template>
  <img v-if="locals.length == 2" :src="getFlag(otherLang)" class="flag" @click="toggleLang" style="margin: 16px;"/>

  <v-menu v-if="locals.length > 2">
    <template #activator="{ props }">
      <div v-bind="props" class="flag-wrapper">
        <img :src="getFlag(locale)" class="flag" style="width: 20px; height: 20px;"/>
        <v-icon class="arrow">mdi-menu-down</v-icon>
      </div>
    </template>

    <v-list style="width: 48px; height: fit-content;" class="d-flex justify-center flex-column align-center">
      <v-list-item
        v-for="lang in locals"
        :key="lang"
        @click="selectLang(lang)"
        style="padding: 0; height: 35px; min-height: auto;"
      >
        <img
          :src="getFlag(lang)"
          style="width: 20px; height: 20px;"
          class="flag"
        />
      </v-list-item>
    </v-list>
  </v-menu>
</template>
  
<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia'
import { useLanguageStore } from '@/stores/language';
import { useDataStore } from '@/stores/data';

const dataStore = useDataStore();
const languageStore = useLanguageStore();

const { data } = storeToRefs(dataStore);
const { locale } = storeToRefs(languageStore);

const locals = data.value.info.locales;

const otherLang = computed(() => {
  if (locals.length === 2) {
    return locals.find(lang => lang !== locale.value);
  }
  return null;
});
  
const getFlag = (lang) => {
  return `https://flagcdn.com/w40/${lang}.png`;
};

const toggleLang = () => {
  if (otherLang.value) {
    languageStore.locale = otherLang.value;
  }
};

const selectLang = (lang) => {
  languageStore.locale = lang;
};
</script>

<style scoped>
.flag {
  width: 28px;
  height: 18px;
  cursor: pointer;
}

.flag-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.arrow {
  margin-left: 4px;
  transition: transform 0.3s ease;
}

.arrow:active {
  transform: rotate(90deg);
}
</style>