import Vue from 'vue';
import Vuex from 'vuex';
// vuex modules

import tagsView from './modules/tagsView';
import permission from './modules/permission';
import app from './modules/app';
import user from './modules/user';
import getters from './getters';
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    tagsView,
    permission,
    app,
    user
  },
  getters
});

export default store;