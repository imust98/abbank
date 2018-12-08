'use strict';

const BaseController = require('./base');
// const qs = require('querystring');
class LoginController extends BaseController {
  async login() {
    const {
      ctx
    } = this;
    const user = await ctx.service.user.login(ctx.request.body);
    if(user){
      ctx.session.user = user;
      // ctx.cookies.set('BANK_SESS','')
    }
    this.setModel({
      result: user
    });
  }
  async logout() {
    const ctx = this.ctx;
    ctx.logger.info(ctx.session.user.userFullName + '  logout')
    ctx.session = null;
    ctx.cookies.set('BANK_SESS', null);
    this.setModel({
      result: true
    });
  }
  async create() {
    const {
      ctx
    } = this;
    const result = await ctx.service.user.create(ctx.request.body);
    this.setModel({
      result: result
    });
  }
  async delete() {
    const {
      ctx
    } = this;
    const {
      id
    } = ctx.params;
    const user = await ctx.service.user.delete(parseInt(id));

    this.setModel({
      result: user
    });
  }
  async update() {
    const {
      ctx
    } = this;
    const {
      id
    } = ctx.params;
    const user = await ctx.service.user.update(parseInt(id),ctx.request.body);

    this.setModel({
      result: user
    });
  }
  
  async list() {
    const {
      ctx
    } = this;
    const list = await ctx.service.user.getList();
    this.setModel({
      result: list
    });
  }
}

module.exports = LoginController;
