 const BaseService = require('./base');
 class UserService extends BaseService {
   async login(data) {
     // const user = await this.ctx.app.mysql.query(
     //   'select * from openid_user where user_id = ?',
     //   uid
     // );
     if (data.username === 'admin' && data.password == 123456) {
       return data;
     }
     return null;
   }
 }
 module.exports = UserService;
