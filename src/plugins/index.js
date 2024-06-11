import pinia from './pinia';
import router from './router';
import vuetify from './vuetify';
import metaTags from './metaTags';

export function registerPlugins(app) {
  app.
    use(vuetify).
    use(router).
    use(metaTags).
    use(pinia);
}
