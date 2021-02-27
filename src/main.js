import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue2Filters from "vue2-filters";
import { imageUrl } from "@/services/constants";
import moment from 'moment'
Vue.config.productionTip = false;



new Vue({
  router,
  store,
  vuetify,
  
  render: h => h(App)
}).$mount("#app");

Vue.use(Vue2Filters);

Vue.filter("imageUrl", function(image) {
  return `${imageUrl}/${image}?timestamp=${Date.now()}`;
});

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
});