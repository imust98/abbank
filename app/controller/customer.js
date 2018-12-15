'use strict';

const BaseController = require('./base');
const querystring = require("querystring");
const fs = require('fs');
const json2csv = require('json2csv').parse;
const iconv = require('iconv-lite');
const path = require('path');
// const qs = require('querystring');
class CustomerController extends BaseController {
  async create() {
    const {
      ctx
    } = this;
    const {
      type
    } = ctx.params;
    let customer_type = 1;
    if (type === 'company') {
      customer_type = 2;
    }
    const result = await ctx.service.customer.create(ctx.request.body, customer_type);
    const customer = await ctx.service.customer.getItem(parseInt(result.id), customer_type);
    this.setModel({
      result: customer
    });
  }
  async delete() {
    const {
      ctx
    } = this;
    const {
      id,
      type
    } = ctx.params;
    let customer_type = 1;
    if (type === 'company') {
      customer_type = 2;
    }
    const customer = await ctx.service.customer.delete(parseInt(id), customer_type);

    this.setModel({
      result: customer
    });
  }
  async update() {
    const {
      ctx
    } = this;
    const {
      type,
      id
    } = ctx.params;
    let customer_type = 1;
    if (type === 'company') {
      customer_type = 2;
    }
    const result = await ctx.service.customer.update(parseInt(id), ctx.request.body, customer_type);
    const customer = await ctx.service.customer.getItem(parseInt(id));
    this.setModel({
      result: customer
    });
  }
  async list() {
    const {
      ctx
    } = this;
    const {
      type
    } = ctx.params;
    let customer_type = 1;
    if (type === 'company') {
      customer_type = 2;
    }
    const params = querystring.parse(ctx.querystring);
    const list = await ctx.service.customer.getList(params, customer_type);
    this.setModel({
      result: list
    });
  }
  async item() {
    const {
      ctx
    } = this;
    const {
      id,
      type
    } = ctx.params;
    let customer_type = 1;
    if (type === 'company') {
      customer_type = 2;
    }
    const item = await ctx.service.customer.getItem(parseInt(id), customer_type);
    this.setModel({
      result: item
    });
  }
  async download() {
    const {
      ctx
    } = this;
    const {
      type
    } = ctx.params;
    let customer_type = 1;
    let fileMap = {
      name:'姓名',
      birthday:'出生年月',
      sex:'性别',
      card_id:'身份证号',
      phone:'电话',
      hk_address:'户口所在地',
      home_address:'家庭住址',
      unit_address:'工作单位',
        income: '收入情况',
        spouse_id: '家庭成员编号',
        card_type: '客户类型',
        credit_id: '信用证编号',
        credit_start_time: '信用证发放日',
        credit_expire_time: '信用证到期日',
        credit_adjuster: '信用证评定人',
        credit_level: '信用证授信级别',
        customer_manager: '客户经理',
        destroy_time: '销户日期',
        destroy_reason: '销户原因'
    }
    if (type === 'company') {
      customer_type = 2;
       fileMap = {
        company_number:'企业编号',
        name:'企业名称',
        license_number:'营业执照编号',
        register_money:'注册资金',
        business_address: '经营地址',
        business_scope: '经营范围',
        stockholder: '股东',
        license_expiry_time: '营业执照有效期',
        credit_institution_number: '信用机构代码证编号',
        credit_institution_expiry_time: '信用机构代码证有效期',
        land_license_number: '土地使用证',
        land_license_expiry_time: '土地使用证有效期',
        special_industry_number: '特种行业许可证编号',
        special_industry_expiry_time: '特种行业许可证有效期',
        open_account_number: '开户许可证编码',
        open_account_expiry_time: '开户许可证有效期',
        credit_id: '信用证编号',
        credit_start_time: '信用证发放日',
        credit_expire_time: '信用证到期日',
        credit_adjuster: '信用证评定人',
        credit_level: '信用证授信级别',
        customer_manager: '客户经理',
        destroy_time: '销户日期',
        destroy_reason: '销户原因'
      }
    }
    const params = querystring.parse(ctx.querystring);
    let list = await ctx.service.customer.getExportList(params, customer_type);
    const fields = ['id', 'name'];
    
    const _list = []
    list = (list || []).forEach(item => {
      let obj = {};
      const arr = Object.keys(item);
      arr.forEach(key => {
        if(fileMap[key]){
          obj[fileMap[key]] = item[key];
        }
      });
      _list.push(obj);
    })
    let csv = json2csv(
      _list || [],
      fields
    );
    const fileName = new Date().getTime() + '.csv';
    const filePath = path.resolve(this.app.config.static.dir, fileName);
    var newCsv = iconv.encode(csv, 'GBK'); // 转编码
    fs.writeFileSync(filePath, newCsv);
    //ctx.attachment 将 Content-Disposition 设置为 “附件” 以指示客户端提示下载
    this.ctx.attachment(fileName);
    this.ctx.set('Content-Type', 'application/octet-stream');
    this.ctx.body = fs.createReadStream(filePath);
  }
}

module.exports = CustomerController;
