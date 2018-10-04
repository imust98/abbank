 const BaseService = require('./base');
 class PersonService extends BaseService {
   async create(data) {
     const result = await this.app.mysql.insert('customer_person', data);
     if (result && result.affectedRows === 1) {
       const person = await this.app.mysql.get('customer_person', {
         id: result.insertId
       });
       return person;
     }
     return result;
   }
   async delete(id) {
     const result = await this.app.mysql.delete('customer_person', {
       id: id
     });
     if (result && result.serverStatus === 2) {
       return {
         id:parseInt(id)
       };
     }
     return result;
   }
   async update(data) {
     const result = await this.app.mysql.update('customer_person', data);
     if (result && result.affectedRows === 1) {
       const person = await this.app.mysql.get('customer_person', {
         id: result.insertId
       });
       return person;
     }
     return result;
   }
   async getList(params) {
     const result = {
       list:[],
       query:{}
     }
     if(!params.keyword) {
      result.list = await this.app.mysql.select('customer_person');
     } else {
      result.list = await this.app.mysql.select('customer_person', { 
        where: { [params.keyword]: params.value }, 
        limit: parseInt(params.pageSize),
        offset: parseInt(params.pageIndex) - 1, 
      });
     }
     
     return result
   }
 }
 module.exports = PersonService;
