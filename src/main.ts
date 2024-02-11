import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Antd from "ant-design-vue";
import router from "./router";
import { createPinia } from "pinia";

// createApp(App).mount('#app')

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(Antd);
app.mount("#app");
