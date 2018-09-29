'use strict';

const Controller = require('egg').Controller;
const qs = require('querystring');

class HomeController extends Controller {
  async login() {
    const {
      ctx
    } = this;
    if (ctx.session.user) {
      ctx.redirect('/customer');
    }
    ctx.body = await this.ctx.renderView('login.ejs');
  }
  async detail() {
    //获取用户的appList
    const {
      ctx
    } = this;
    ctx.body = await ctx.renderView('index.ejs');
  }
  async nofound() {
    const {
      ctx
    } = this;
    ctx.body = await ctx.renderView('404.ejs');
  }
}

module.exports = HomeController;
