import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
const EventBus = new Vue();
Vue.prototype.$bus = EventBus;
new Vue({
  render: (h) => h(App)
}).$mount("#app");
