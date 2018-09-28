import {
  changeApp,
  getAccessToken
} from '@/api/user';
const app = {
  state: {
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    appId: window.config.appId
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened;
    },
    CHANGE_APP: (state, appId) => {
      state.appId = appId;
    }
  },
  actions: {
    toggleSideBar({
      commit
    }) {
      commit('TOGGLE_SIDEBAR');
    },
    changeApp({
      commit
    }, appId) {
      return new Promise((resolve, reject) => {
        changeApp(appId).then(response => {
          const data = response.data;
          commit('CHANGE_APP', data.result.appId);
          resolve();
        })
      })
    },
    getAccessToken({commit}){
      return new Promise((resolve, reject) => {
        getAccessToken().then(response => {
          const data = response.data;
          resolve(data.result);
        })
      })
    }
  }
};
export default app;
