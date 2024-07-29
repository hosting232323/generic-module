import App from './App.vue';
import { createApp } from 'vue';
import { registerPlugins } from '@/plugins';
import { vSlideIn } from '@/plugins/slideInDirective';

const app = createApp(App);

app.directive('slide-in', vSlideIn);
registerPlugins(app);

app.mount('#app');
