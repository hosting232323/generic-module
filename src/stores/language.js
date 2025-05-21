import { defineStore } from 'pinia';

export const useLanguageStore = defineStore('language', {
  state: () => ({
    locale: 'it'
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
});
