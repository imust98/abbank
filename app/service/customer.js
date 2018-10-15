const BaseService = require('./base');
const _ = require('lodash');
class CustomerService extends BaseService {
  async create(data, customer_type) {
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      const res1 = await conn.insert('customer_base', {
        name: data.name,
        customer_type: data.customer_type
      });
      // const res2 = await conn.insert('customer_credit', {
      //   customer_id: res1.insertId
      // });
      // const res3 = await conn.insert('customer_loans', {
      //   customer_id: res1.insertId
      // });
      const _data = Object.assign({}, data);
      delete _data.name;
      delete _data.customer_type;
      if (customer_type === 1) {
        const res4 = await conn.insert(
          'customer_person',
          Object.assign({}, _data, {
            customer_id: res1.insertId
          })
        );
      } else {
        const res5 = await conn.insert(
          'customer_company',
          Object.assign({}, _data, {
            customer_id: res1.insertId
          })
        );
      }
      return {
        id: res1.insertId
      };
    }, this.ctx);
    return {
      id: result.id
    };
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
    let result = {};
    const table = 'customer_person';
    const formType = data.formType;
    delete data.formType;
    delete data.customer_type;
    if (formType === 'base') {
      const aa = await this.app.mysql.update('customer_base', {
        id: id,
        name: data.name
      });
      delete data.name;
      result = await this.app.mysql.update(
        table,
        Object.assign(
          {
            id
          },
          data
        )
      );
    } else if (data.formType === 'credit') {
      result = await this.app.mysql.update('customer_credit', data, {
        where: {
          customer_id: id
        }
      });
    } else {
      result = await this.app.mysql.update('customer_loans', data, {
        where: {
          customer_id: id
        }
      });
    }
    return result;
  }
  async getList(params, customer_type) {
    const result = {
      list: [],
      query: {}
    };

    let sql = `select  cb.id,
     cb.name,
     cp.birthday,
     cp.sex,
     cp.card_id,
     cp.phone,
     cp.hk_address,
     cp.home_address 
     from customer_base cb`;
    if (params.statisticsType) {
      if (params.statisticsType === 1) {
        sql += `inner join customer_person cp on cb.id = cp.customer_id`;
        sql += `inner join customer_credit cc on cb.id = cc.customer_id`;
      } else {
        sql += `inner join customer_person cp on cb.id = cp.customer_id`;
        sql += `inner join customer_loans cl on cb.id = cl.customer_id`;
      }
    } else {
      sql += `left join customer_person cp on cb.id = cp.customer_id`;
      sql += `left join customer_credit cc on cb.id = cc.customer_id`;
      sql += `left join customer_loans cl on cb.id = cl.customer_id`;
    }
    sql += ` where 1 = 1`;
    if (params.name) {
      sql += ` and cb.name = '${params.name}'`;
    }
    if (params.id) {
      sql += ` and cb.id = '${params.id}'`;
    }
    const totalList = await this.app.mysql.query(sql);
    result.query.totalCount = totalList.length;
    result.query.totalPageCount = Math.ceil(totalList.length / params.pageSize);
    const startIndex = params.pageIndex - 1;
    const offset = startIndex * params.pageSize;
    sql = sql + ` limit ${offset},${params.pageSize}`;
    result.list = await this.app.mysql.query(sql);
    return result;
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
