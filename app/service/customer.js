 const BaseService = require('./base');
 const _ = require('lodash');
 class CustomerService extends BaseService {
   async create(data, customer_type) {
     const result = await this.app.mysql.beginTransactionScope(async conn => {
       const res1 = await conn.insert('customer_base', {
         name: data.name,
         customer_type: data.customer_type
       });
       const res2 = await conn.insert('customer_credit', {
         customer_id: res1.insertId
       });
       const res3 = await conn.insert('customer_loans', {
         customer_id: res1.insertId
       });
       const _data = Object.assign({}, data);
       delete _data.name;
       delete _data.customer_type;
       if (customer_type === 1) {
         const res4 = await conn.insert('customer_person', Object.assign({}, _data, {
           customer_id: res1.insertId
         }));
       } else {
         const res5 = await conn.insert('customer_customer', Object.assign({}, _data, {
           customer_id: res1.insertId
         }));
       }
       return {
         id: res1.insertId
       };
     }, this.ctx);
     return {
       id: result.id
     }
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
     if (data.credit_id) {
       //保存信用信息
       const _data = {
         credit_starttime: data.credit_starttime,
         credit_expiretime: data.credit_expiretime,
         credit_adjuster: data.credit_adjuster,
         credit_level: data.credit_level,
         id: data.credit_id
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
     let sql = '';
     if (params.type) {
       if (params.keyword) {
         if (params.type === 'credit') {
           sql = `select * from customer_person  where credit_id and ${params.keyword} = '${params.value}'`;
         } else {
           sql = `select * from customer_person  where loans_count and ${params.keyword} = '${params.value}'`;
         }
       } else {
         if (params.type === 'credit') {
           sql = `select * from customer_person  where credit_id`;
         } else {
           sql = `select * from customer_person  where loans_count`;
         }
       }
     } else {
       if (params.keyword) {
         if (params.type === 'credit') {
           sql = `select * from customer_person  where  ${params.keyword} = '${params.value}'`;
         } else {
           sql = `select * from customer_person  where  ${params.keyword} = '${params.value}'`;
         }
       } else {
         sql = `select * from customer_person`;
       }
     }
     const totalList = await this.app.mysql.query(sql);
     result.query.totalCount = totalList.length;
     result.query.totalPageCount = Math.ceil(totalList.length / params.pageSize);
     const startIndex = params.pageIndex - 1;
     const offset = startIndex * params.pageSize;
     sql = sql + ` limit ${offset},${params.pageSize}`;
     result.list = await this.app.mysql.query(sql);
     return result
   }
   async getItem(id, customer_type) {
     let table = 'customer_person';
     if (customer_type === 2) {
       table = 'customer_company';
     }
     const customer = await this.app.mysql.get('customer_base', {
       id
     });
     const extra = await this.app.mysql.get(table, {
       customer_id: id
     });
     const credit = await this.app.mysql.get('customer_credit', {
       customer_id: id
     });
     const loans = await this.app.mysql.get('customer_loans', {
       customer_id: id
     });
     Object.assign(customer, _.omit(extra, ['id']));
     Object.assign(customer, _.omit(credit, ['id']));
     Object.assign(customer, _.omit(loans, ['id']));
     return customer;
   }
 }
 module.exports = CustomerService;
