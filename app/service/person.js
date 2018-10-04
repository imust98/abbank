 const BaseService = require('./base');
 class PersonService extends BaseService {
   async create(data) {
     data.spouse_id = parseInt(data.spouse_id || 0);
     const result = await this.app.mysql.insert('customer_person', data);
     return (result && {
       id: result.insertId
     }) || {};
   }
   async addCredit(pid, data) {
     const result = await this.app.mysql.insert('customer_credit', Object.assign(data, {
       pid: pid
     }));
     if (result && result.affectedRows === 1) {
       // 客户表信息写入信用id
       const res = await this.app.mysql.update('customer_person', {
         'id': pid,
         'credit_id': result.insertId
       });
     }
     return (result && {
       id: pid
     }) || {};
   }
   async delete(id) {
     const result = await this.app.mysql.delete('customer_person', {
       id: id
     });
     if (result && result.serverStatus === 2) {
       return {
         id: parseInt(id)
       };
     }
     return result;
   }
   async update(id, data) {
     if(data.credit_id) {
       //保存信用信息
       const _data = {
        credit_starttime: data.credit_starttime,
        credit_expiretime: data.credit_expiretime,
        credit_adjuster: data.credit_adjuster,
        credit_level: data.credit_level,
        id:data.credit_id
       }
       delete data.credit_starttime;
       delete data.credit_expiretime;
       delete data.credit_adjuster;
       delete data.credit_level;
       const res = await this.app.mysql.update('customer_credit', _data);
     }
     const result = await this.app.mysql.update('customer_person', data);
     return (result && {
       id
     }) || {};
   }
   async getList(params) {
     const result = {
       list: [],
       query: {}
     }
     if (!params.keyword) {
       result.list = await this.app.mysql.select('customer_person');
     } else {
       result.list = await this.app.mysql.select('customer_person', {
         where: {
           [params.keyword]: params.value
         },
         limit: parseInt(params.pageSize),
         offset: parseInt(params.pageIndex) - 1,
       });
     }

     return result
   }
   async getItem(id) {
     const result = await this.app.mysql.get('customer_person', {
       id
     });
     if (result.credit_id) {
       const res = await this.app.mysql.get('customer_credit', {
         id: result.credit_id
       });
       for (let key in res) {
         if (key !== 'id' && key !== 'pid') {
           result[key] = res[key];
         }
       }
     }
     return result;
   }
 }
 module.exports = PersonService;
