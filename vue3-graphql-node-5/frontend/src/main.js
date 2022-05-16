import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// Import Bootstrap CSS files
import "bootstrap/dist/css/bootstrap.css";
//import "bootstrap/dist/css/bootstrap.css.map";

// Import Font Awesome CSS files
import "font-awesome/css/font-awesome.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
