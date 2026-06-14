import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { seedLocalStorage } from "./mocks/seed";
import { notifyError } from "./lib/notifyError.ts";

seedLocalStorage();

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

app.config.errorHandler = (err) => notifyError(err);
window.addEventListener("unhandledrejection", (e) => notifyError(e.reason));
