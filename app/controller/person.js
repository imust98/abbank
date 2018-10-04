'use strict';

const BaseController = require('./base');
const querystring = require("querystring");
// const qs = require('querystring');
class PersonController extends BaseController {
  async create() {
    const {
      ctx
    } = this;
    const result = await ctx.service.person.create(ctx.request.body);
    const person = await ctx.service.person.getItem(parseInt(result.id));
    this.setModel({
      result: person
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
    const result = await ctx.service.person.addCredit(pid, ctx.request.body);
    const person = await ctx.service.person.getItem(parseInt(result.id));

    this.setModel({
      result: person
    });
  }
  async delete() {
    const {
      ctx
    } = this;
    const {
      id
    } = ctx.params;
    const person = await ctx.service.person.delete(id);

    this.setModel({
      result: person
    });
  }
  async update() {
    const {
      ctx
    } = this;
    const {
      id
    } = ctx.params;
    const result = await ctx.service.person.update(parseInt(id), ctx.request.body);
    const person = await ctx.service.person.getItem(parseInt(id));
    this.setModel({
      result: person
    });
  }
  async list() {
    const {
      ctx
    } = this;
    const params = querystring.parse(ctx.querystring);
    const list = await ctx.service.person.getList(params);
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
    const item = await ctx.service.person.getItem(parseInt(id));
    this.setModel({
      result: item
    });
  }
}

module.exports = PersonController;
