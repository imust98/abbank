import Vue from 'vue';
import Router from 'vue-router';
// import Layout from '../views/layout/index.vue';

Vue.use(Router);


export const constantRouterMap = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index'
  }
];
export default new Router({
  mode: 'history',
  routes: []
});

