import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../views/layout/index.vue';
import PersonView from '@/views/customerManage/person/personList.vue';
import PersonCreate from '@/views/customerManage/person/person.vue';
import PersonModify from '@/views/customerManage/person/personModify.vue';
import PersonCredit from '@/views/customerManage/credit.vue';

import PersonCreditView from '@/views/customerManage/person/personCreditList.vue';
import PersonLoanView from '@/views/customerManage/person/personLoanList.vue';
import PersonItView from '@/views/customerManage/person/personList.vue';
import PersonBlackView from '@/views/customerManage/person/personList.vue';

import CompanyCredit from '@/views/customerManage/credit.vue';
import CompanyView from '@/views/customerManage/company/companyList.vue';
import CompanyCreate from '@/views/customerManage/company/company.vue';
import CompanyModify from '@/views/customerManage/company/companyModify.vue';
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
        name:"personList",
        meta: {
          title: '个人客户',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'person/create',
        component: PersonCreate,
        hidden: true,
        name:"personCreate",
        meta: {
          title: '添加个人客户',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'person/addCredit/:id',
        component: PersonCredit,
        hidden: true,
        name:"personCredit",
        meta: {
          title: '添加信用信息',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'person/modify/:id',
        component: PersonModify,
        hidden: true,
        name:"personModify",
        meta: {
          title: '修改客户信息',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'company/list',
        component: CompanyView,
        name:"companyList",
        meta: {
          title: '企业客户',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'company/create',
        component: CompanyCreate,
        hidden: true,
        name:"CompanyCreate",
        meta: {
          title: '添加企业客户',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'company/addCredit/:id',
        component: CompanyCredit,
        hidden: true,
        name:"companyCredit",
        meta: {
          title: '添加信用信息',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'company/modify/:id',
        component: CompanyModify,
        hidden: true,
        name:"CompanyModify",
        meta: {
          title: '修改企业信息',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
      // {
      //   path: 'person/credit/list',
      //   component: PersonCreditView,
      //   name:"personCreditList",
      //   meta: {
      //     title: '信用信息',
      //     roles: ['admin'] // or you can only set roles in sub nav
      //   }
      // },
      // {
      //   path: 'person/loan/list',
      //   component: PersonLoanView,
      //   name:"personLoanList",
      //   meta: {
      //     title: '贷款信息',
      //     roles: ['admin'] // or you can only set roles in sub nav
      //   }
      // },
      // {
      //   path: 'person/it/list',
      //   component: PersonItView,
      //   name:"personItList",
      //   meta: {
      //     title: '信息员',
      //     roles: ['admin'] // or you can only set roles in sub nav
      //   }
      // },
      // {
      //   path: 'person/black/list',
      //   component: PersonBlackView,
      //   name:"personBlackList",
      //   meta: {
      //     title: '黑名单',
      //     roles: ['admin'] // or you can only set roles in sub nav
      //   }
      // }
    ]
  }
];
export default new Router({
  mode: 'history',
  routes: constantRouterMap
});

export const asyncRouterMap = [];