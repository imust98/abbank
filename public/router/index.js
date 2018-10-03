import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../views/layout/index.vue';
import PersonView from '@/views/customerManage/personList.vue';
import PersonCreate from '@/views/customerManage/person.vue';
import CompanyView from '@/views/customerManage/company.vue';
Vue.use(Router);


export const constantRouterMap = [
  {
    path: '/customer',
    component: Layout,
    alwaysShow: true,
    redirect: '/customer/person/list',
    name: 'customer',
    meta: {
      title: '客户管理',
      icon: 'message'
    },
    children: [
      {
        path: 'person/list',
        component: PersonView,
        name:"person",
        meta: {
          title: '个人客户',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'person/create',
        component: PersonCreate,
        hidden: true,
        name:"person",
        meta: {
          title: '添加个人客户',
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
  // {
  //   path: '/customer1',
  //   component: Layout,
  //   alwaysShow: true,
  //   redirect: '/customer/person',
  //   name: 'customer1',
  //   meta: {
  //     title: '查询统计',
  //     icon: 'message'
  //   },
  //   children: [
  //     {
  //       path: 'person1',
  //       component: PersonView,
  //       name:"person1",
  //       meta: {
  //         title: '贷款统计',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'company1',
  //       component: CompanyView,
  //       name:"company1",
  //       meta: {
  //         title: '信用统计',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     }
  //   ]
  // }
];
export default new Router({
  mode: 'history',
  routes: constantRouterMap
});

