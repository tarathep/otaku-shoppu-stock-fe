import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Antd from "ant-design-vue";
import router from "./router";

// createApp(App).mount('#app')

const app = createApp(App);
app.use(router);
app.use(Antd);
app.mount("#app");
