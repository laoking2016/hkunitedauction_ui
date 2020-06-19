import Vue from 'vue'
import App from './App.vue'
import { router } from './router'

import MainMenu from './component/MainMenu'

Vue.component('main-menu', MainMenu);

import { Tabbar, TabbarItem } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Image } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Col, Row } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import { Grid, GridItem } from 'vant';
import { Tag } from 'vant';
import { Form } from 'vant';
import { Field } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { Stepper } from 'vant';
import { Button } from 'vant';
import { NavBar } from 'vant';
import { Tab, Tabs } from 'vant';
import { List } from 'vant';
import { Card } from 'vant';
import { Icon } from 'vant';
import { Panel } from 'vant';
import { Step, Steps } from 'vant';
import { Popup } from 'vant';
import { Search } from 'vant';
import { Sidebar, SidebarItem } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Divider } from 'vant';
import { Toast } from 'vant';
import { SubmitBar } from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Image);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Col);
Vue.use(Row);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Tag);
Vue.use(Form);
Vue.use(Field);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Stepper);
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
Vue.use(Card);
Vue.use(Icon);
Vue.use(Panel);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Popup);
Vue.use(Search);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Divider);
Vue.use(Toast);
Vue.use(SubmitBar);

Vue.config.productionTip = false

import axios from 'axios';
import { API_BASEURL } from './util/const';
axios.defaults.baseURL = API_BASEURL;

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
      Toast.fail(error.response.data.message);
    }
  }
  return Promise.reject(error);
});

import store from './store'

new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App),
});
