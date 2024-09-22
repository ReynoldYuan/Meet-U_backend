
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import FontAwesomeIcon from "./plugins/fontawesome.js";
import './assets/css/style.css'
import 'chart.js'
import './assets/js/main'
import './assets/css/owl.carousel.min.css'
import './assets/css/tempusdominus-bootstrap-4.min.css'
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App)
    .use(router)
    .use(pinia)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
