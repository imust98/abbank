'use strict';

const BaseController = require('./base');
const querystring = require("querystring");
// const qs = require('querystring');
class CompanyController extends BaseController {
  async create() {
    const {
      ctx
    } = this;
    const result = await ctx.service.company.create(ctx.request.body);
    const company = await ctx.service.company.getItem(parseInt(result.id));
    this.setModel({
      result: company
    });
  }
  async addCredit() {
    const {
      ctx
    } = this;
    const {
      id
    } = ctx.params;
    const pid = parseInt(id);
    const result = await ctx.service.company.addCredit(pid, ctx.request.body);
    const company = await ctx.service.company.getItem(parseInt(result.id));

    this.setModel({
      result: company
    });
  }
  async delete() {
    const {
      ctx
    } = this;
    const {
      id
    } = ctx.params;
    const company = await ctx.service.company.delete(id);

    this.setModel({
      result: company
    });
  }
  async update() {
    const {
      ctx
    } = this;
    const {
      id
    } = ctx.params;
    const result = await ctx.service.company.update(parseInt(id), ctx.request.body);
    const company = await ctx.service.company.getItem(parseInt(id));
    this.setModel({
      result: company
    });
  }
  async list() {
    const {
      ctx
    } = this;
    const params = querystring.parse(ctx.querystring);
    const list = await ctx.service.company.getList(params);
    this.setModel({
      result: list
    });
  }
  async item() {
    const {
      ctx
    } = this;
    const {
      id
    } = ctx.params;
    const item = await ctx.service.company.getItem(parseInt(id));
    this.setModel({
      result: item
    });
  }
}

module.exports = CompanyController;
