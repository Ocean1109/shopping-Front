import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 用于和后台交互，发送请求
import axios from 'axios';
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://localhost:8181';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
