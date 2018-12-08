 const BaseService = require('./base');
 class UserService extends BaseService {
   async login(data) {
     const user = await this.ctx.app.mysql.get('user_info', {
       username: data.username
     });
     if (user && data.password === user.password) {
       return data;
     }
     return null;
   }
   async create(data) {
     const result = await this.app.mysql.insert('user_info', data);
     return (result && {
       id: result.insertId
     }) || {};
   }
   async update(id, data) {
    const result = await this.app.mysql.update('user_info', data, {
      where: {
        id: id
      }
    });
    return result || {
      id
    }
  }
   async getList() {
     const result = await this.app.mysql.select('user_info',{
      columns: ['id', 'username','realname','role']
     });
     return (result || [])
   }
   async delete(id) {
     const result = await this.app.mysql.delete('user_info', {
       id: id,
     });
     return (result && {
       id: id
     }) || {};
   }

 }
 module.exports = UserService;
