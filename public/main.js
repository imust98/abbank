// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import Element from 'element-ui';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/index.scss'; // global css

import App from './App';
import router from './router';
import store from './store';

import './icons'; // regist svg-icon

import * as filters from './filters'; // global filters

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.use(Element, {
  size: 'medium' // set element-ui default size
});

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

store.dispatch('GenerateRoutes', window.config.user.role).then(() => { // 根据roles权限生成可访问的路由表
  router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
})