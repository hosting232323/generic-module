import head from './head';
import pinia from './pinia';
import router from './router';
import vuetify from './vuetify';
import i18n from './i18n';


export function registerPlugins(app) {
  app.
    use(head).
    use(pinia).
    use(router).
    use(vuetify).
    use(i18n);
};
