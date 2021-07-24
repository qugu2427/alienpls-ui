import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueSocketIOExt from "vue-socket.io-extended";
import { io } from "socket.io-client";
import VueCookie from "vue-cookie";

const socket = io("https://api.alienpls.com", { autoConnect: false });

Vue.use(VueSocketIOExt, socket);
Vue.use(VueCookie);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
