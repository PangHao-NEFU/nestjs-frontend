import { createApp } from 'vue';
import App from './App.vue';

import { setupStore } from './store/index';
import { setupRouter } from './router';

//引入bootstrap样式的js
import 'bootstrap/dist/js/bootstrap';

function bootstrap() {
  const app = createApp(App);
  // 注册router
  setupRouter(app);

  // 注册store
  setupStore(app);

  app.mount('#app');
}

bootstrap();
