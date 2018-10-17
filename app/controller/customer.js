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
    if (type === 'company') {
      customer_type = 2;
    }
    const params = querystring.parse(ctx.querystring);
    const list = await ctx.service.customer.getExportList(params, customer_type);
    const fields = ['表一', '头儿', '测额'];


    let csv = json2csv(
      list || [],
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
