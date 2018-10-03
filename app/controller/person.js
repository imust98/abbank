'use strict';

const BaseController = require('./base');
// const qs = require('querystring');
class PersonController extends BaseController {
  async create() {
    const {
      ctx
    } = this;
    const person = await ctx.service.person.create(ctx.request.body);
    
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
    const person = await ctx.service.person.update(ctx.request.body);
    
    this.setModel({
      result: person
    });
  }
  async list() {
    const {
      ctx
    } = this;
    const list = await ctx.service.person.getList(ctx.request.body);
    this.setModel({
      result: list
    });
  }
}

module.exports = PersonController;
