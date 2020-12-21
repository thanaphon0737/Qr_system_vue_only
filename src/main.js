import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue2Filters from "vue2-filters";
import { imageUrl } from "@/services/constants";
import io from "socket.io-client"
Vue.config.productionTip = false;



new Vue({
  router,
  store,
  vuetify,
  data(){
    return {
      socket: io("http://localhost:8081")
    }
  },
  render: h => h(App)
}).$mount("#app");

Vue.use(Vue2Filters);

Vue.filter("imageUrl", function(image) {
  return `${imageUrl}/${image}?timestamp=${Date.now()}`;
});