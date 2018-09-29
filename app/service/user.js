 const BaseService = require('./base');
 class UserService extends BaseService {
   async login(data) {
     const user = await this.ctx.app.mysql.query(
       'select * from user where username = ?',
       data.username
     );
     if (data.password === user.password ) {
       return data;
     }
     return null;
   }
 }
 module.exports = UserService;
