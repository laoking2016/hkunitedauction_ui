import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Routers from './router.js';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from 'axios';
import { API_BASEURL } from './util/const'
import ImageSelector from './component/ImageSelector'

import store from './store'

Vue.config.productionTip = false

axios.defaults.baseURL = API_BASEURL;

Vue.use(VueRouter);
Vue.use(ViewUI);

Vue.component('ImageSelector', ImageSelector);

const RouterConfig = {
  routes: Routers
};
const router = new VueRouter(RouterConfig);

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  if(window.localStorage.getItem('token') != null){
    config.headers["Authorization"] = `Bearer ${window.localStorage.getItem('token')}`
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if(error.response.status == "401"){
    router.push('/login');
  }else{
    if(error.response.data.message != "" && error.response.data.message != null){
      Vue.$Message.error(error.response.data.message);
    }
  }
  return Promise.reject(error);
});

new Vue({
  store,
  el: '#app',
  router: router,
  render: h => h(App)
});
