import { createPinia } from "pinia";
import { App } from "vue";

//创建Pinia实例,用于全局状态管理
const store = createPinia();
export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
