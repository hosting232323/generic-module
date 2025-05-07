import { createI18n } from 'vue-i18n';

import itLocale from '@/locales/it.json';
import enLocale from '@/locales/en.json';

const i18n = createI18n({
  legacy: false,
  locale: 'it',
  messages: {
    it: itLocale,
    en: enLocale
  }
});

export default i18n;
