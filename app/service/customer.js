const BaseService = require('./base');
const _ = require('lodash');
// customer_type:1 个人客户 2 企业客户
class CustomerService extends BaseService {
  async create(data, customer_type) {
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      const res = await conn.insert('customer_base', {
        name: data.name,
        customer_type: customer_type
      });
      const _data = Object.assign({}, data);
      delete _data.name;
      if (customer_type === 1) {
        await conn.insert(
          'customer_person',
          Object.assign({}, _data, {
            customer_id: res.insertId
          })
        );
      } else {
        await conn.insert(
          'customer_company',
          Object.assign({}, _data, {
            customer_id: res.insertId
          })
        );
      }
      return {
        id: res.insertId
      };
    }, this.ctx);
    return {
      id: result.id
    };
  }
  async delete(id, customer_type) {
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      await conn.delete('customer_base', {
        id: id
      });
      if (customer_type == 1) {
        await conn.delete('customer_person', {
          customer_id: id
        });
      } else {
        await conn.delete('customer_company', {
          customer_id: id
        });
      }
      await conn.delete('customer_credit', {
        customer_id: id
      });
      await conn.delete('customer_loans', {
        customer_id: id
      });
    }, this.ctx);

    return {
      id
    };
  }
  async update(id, data, customer_type) {
    let table = 'customer_person';
    const formType = data.formType;
    delete data.formType;
    if (customer_type === 2) {
      table = 'customer_company';
    }
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      if (formType === 'base') {
        await conn.update('customer_base', {
          id: id,
          name: data.name
        });
        delete data.name;
        await conn.update(
          table,
          Object.assign({
              id
            },
            data
          )
        );
      } else if (formType === 'credit') {
        const item = await conn.get('customer_credit', {
          customer_id: id
        });
        if (item) {
          await conn.update('customer_credit', data, {
            where: {
              customer_id: id
            }
          });
        } else {
          await conn.insert(
            'customer_credit',
            Object.assign(data, {
              customer_id: id
            })
          );
        }
      } else {
        const item = await conn.get('customer_loans', {
          customer_id: id
        });
        if (item) {
          await conn.update('customer_loans', data, {
            where: {
              customer_id: id
            }
          });
        } else {
          await conn.insert(
            'customer_loans',
            Object.assign(data, {
              customer_id: id
            })
          );
        }
      }
    }, this.ctx);
    return result;
  }
  async getList(params, customer_type) {
    const result = {
      list: [],
      query: {}
    };
    let table = 'customer_person';
    let sql = `select  cb.id,
     cb.name,
     cp.birthday,
     cp.sex,
     cp.card_id,
     cp.phone,
     cp.hk_address,
     cp.home_address 
     from customer_base cb`;
    if (customer_type === 2) {
      table = 'customer_company';
      sql = `select  cb.id,
      cb.name,
      cp.company_number,
      cp.license_number,
      cp.register_money,
      cp.business_address,
      cp.business_scope
      from customer_base cb`;
    }
    if (params.statisticsType) {
      if (params.statisticsType === 'credit') {
        sql += ` inner join ${table} cp on cb.id = cp.customer_id`;
        sql += ` inner join customer_credit cc on cb.id = cc.customer_id`;
      } else {
        sql += ` inner join ${table} cp on cb.id = cp.customer_id`;
        sql += ` inner join customer_loans cl on cb.id = cl.customer_id`;
      }
    } else {
      sql += ` left join ${table} cp on cb.id = cp.customer_id`;
      sql += ` left join customer_credit cc on cb.id = cc.customer_id`;
      sql += ` left join customer_loans cl on cb.id = cl.customer_id`;
    }
    sql += ` where 1 = 1`;
    if (params.name) {
      sql += ` and cb.name = '${params.name}'`;
    }
    if (params.id) {
      sql += ` and cb.id = '${params.id}'`;
    }
    if (params.card_type) {
      sql += ` and cp.card_type = '${params.card_type}'`;
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
  async getExportList(params, customer_type) {
    let table = 'customer_person';
    let sql = `select *
     from customer_base cb`;
    if (customer_type === 2) {
      table = 'customer_company';
      sql = `select * 
      from customer_base cb`;
    }
    if (params.statisticsType) {
      if (params.statisticsType === 1) {
        sql += ` inner join ${table} cp on cb.id = cp.customer_id`;
        sql += ` inner join customer_credit cc on cb.id = cc.customer_id`;
      } else {
        sql += ` inner join ${table} cp on cb.id = cp.customer_id`;
        sql += ` inner join customer_loans cl on cb.id = cl.customer_id`;
      }
    } else {
      sql += ` left join ${table} cp on cb.id = cp.customer_id`;
      sql += ` left join customer_credit cc on cb.id = cc.customer_id`;
      sql += ` left join customer_loans cl on cb.id = cl.customer_id`;
    }
    sql += ` where 1 = 1`;
    if (params.name) {
      sql += ` and cb.name = '${params.name}'`;
    }
    if (params.id) {
      sql += ` and cb.id = '${params.id}'`;
    }
    if (params.card_type) {
      sql += ` and cp.card_type = '${params.card_type}'`;
    }
    const result = await this.app.mysql.query(sql);

    return result;
  }
}
module.exports = CustomerService;
