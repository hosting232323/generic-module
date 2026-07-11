import pinia from './pinia';
import vuetify from './vuetify';


export function registerPlugins(app) {
  app.
    use(pinia).
    use(router);
}
