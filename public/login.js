// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';


import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Login from './views/login/index';


import './icons'; // regist svg-icon




Vue.config.productionTip = false;

Vue.use(Element, {
  size: 'medium' // set element-ui default size
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(Login)
});
