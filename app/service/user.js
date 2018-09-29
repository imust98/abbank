 const BaseService = require('./base');
 class UserService extends BaseService {
   async login(data) {
     const user = await this.ctx.app.mysql.get('user', {
       username: data.username
     });
     if (user && data.password === user.password) {
       return data;
     }
     return null;
   }
 }
 module.exports = UserService;
