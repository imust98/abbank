 import {
   logout,
   getList,
   addUser,
   deleteUser
 } from '@/api/user';
 const user = {
   state: {
    info:window.config.user,
    list:[],
   },
   mutations: {
    UserListLoad: (state, list) => {
      state.list = list;
    },
    UserAddLoad:(state,user) => {
      state.list.unshift(user);
    },
    UserDelete: (state, user) => {
      const index = state.list.findIndex(item => item.id === user.id);
      state.list.splice(index, 1);
    }
   },
   actions: {
     // 登出
     LogOut({
       commit,
       state
     }) {
       return new Promise((resolve, reject) => {
         logout(state.token)
           .then(() => {
             resolve();
           })
           .catch(error => {
             removeToken();
             reject(error);
           });
       });
     },
     GetUserList({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        getList(data).then(response => {
          const data = response.data;
          commit('UserListLoad', data.result);
          resolve(data.result);
        });
      });
    },
     AddUser({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        addUser(data).then(response => {
          const data = response.data;
          commit('UserAddLoad', data.result);
          resolve(data.result);
        });
      });
    },
    DelUser({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        deleteUser(data).then(response => {
          const data = response.data;
          commit('UserDelete', data.result);
          resolve(data.result);
        });
      });
    }
   }
 }
 export default user;
