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
    const {
      ctx
    } = this;
    ctx.body = await ctx.renderView('index.ejs',{
      user:{
        id:ctx.session.user.id,
        username:ctx.session.username,
        realname:ctx.session.realname,
        role:ctx.session.role
      }
    });
  }
  async nofound() {
    const {
      ctx
    } = this;
    ctx.body = await ctx.renderView('404.ejs');
  }
}

module.exports = HomeController;
