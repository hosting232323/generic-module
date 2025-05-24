import { defineStore } from 'pinia';

export const useLanguageStore = defineStore('language', {
  state: () => ({
    locale: 'it'
  }),
  actions: {
    setLocale(lang) {
      this.locale = lang
    },
    getText(text) {
      if (typeof text === 'string') return text
      if (typeof text === 'object') return text[this.locale]
      return ''
    },
    getAncor(text) {
      if (!text) return ''
      if (typeof text === 'string') return text
      if (typeof text === 'object') return Object.values(text)[0]
      return ''
    }
  },
  persist: {
    storage: localStorage,
  }
});
