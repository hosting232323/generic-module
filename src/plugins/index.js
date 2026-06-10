import head from './head';
import klaro from './klaro';
import pinia from './pinia';
import router from './router';
import vuetify from './vuetify';
import analytics from './analytics';


export function registerPlugins(app) {
  app.
    use(head).
    use(pinia).
    use(router).
    use(vuetify).
    use(analytics).
    use(klaro);
}
