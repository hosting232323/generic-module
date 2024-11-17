import head from './head';
import pinia from './pinia';
import router from './router';
import vuetify from './vuetify';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


export function registerPlugins(app) {
  pinia.use(piniaPluginPersistedstate);
  app.
    use(head).
    use(pinia).
    use(router).
    use(vuetify);
};
