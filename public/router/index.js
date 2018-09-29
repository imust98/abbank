import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../views/layout/index.vue';
import PersonView from '@/views/customerManage/person.vue';
import CompanyView from '@/views/customerManage/company.vue';
Vue.use(Router);


export const constantRouterMap = [
  {
    path: '/customer',
    component: Layout,
    alwaysShow: true,
    redirect: '/customer/person',
    name: 'customer',
    meta: {
      title: '客户管理',
      icon: 'message'
    },
    children: [
      {
        path: 'person',
        component: PersonView,
        name:"person",
        meta: {
          title: '个人客户',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'company',
        component: CompanyView,
        name:"company",
        meta: {
          title: '企业客户',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  }
];
export default new Router({
  mode: 'history',
  routes: constantRouterMap
});

