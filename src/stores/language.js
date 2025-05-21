import { defineStore, storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/data';

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

export const useLanguageStore = defineStore('language', {
  state: () => ({
    locale: data.value.info.locales[0]
  }),
  actions: {
    setLocale(lang) {
      this.locale = lang
    },
    getText (text) {
      if (typeof text === 'string') return text
      if (typeof text === 'object') return text[this.locale]
      return ''
    }
  },
  persist: {
    storage: localStorage,
  }
})
