 import {
   logout
 } from '@/api/user';
 const user = {
   state: {
    info:window.config.user
   },
   mutations: {

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
     }
   }
 }
 export default user;
