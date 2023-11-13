import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { router } from "./router";
import store from '@/store'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./style.less";
import "./elementui.less"
import 'nprogress/nprogress.css'
import permission from '@/directives/permission.js'

const app = createApp(App);

app.use(permission)
app.use(ElementPlus);
app.use(router);
app.use(store)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
import './permission.js'

app.mount("#app");
