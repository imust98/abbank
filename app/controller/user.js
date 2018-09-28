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
}

module.exports = LoginController;
