'use strict';

const Controller = require('egg').Controller;
const qs = require('querystring');

class HomeController extends Controller {
  async login() {
    const {
      ctx
    } = this;
    if (ctx.session.user) {
      ctx.redirect('/dashboard');
    }
    ctx.body = await this.ctx.renderView('login.ejs');
  }
  async authorization() {
    //获取服务号预授权码 todo 
    this.logger.debug('request /authorization');
    const {
      ctx
    } = this;
    const result = await ctx.httpGet(ctx.app.config.host.path + '/api/wx/preAuthCode');
    const data = result.result;
    const url = 'https://mp.weixin.qq.com/cgi-bin/componentloginpage?';
    const params = Object.assign({}, this.ctx.app.config.wx);
    params.pre_auth_code = data.preAuthCode || 'xxx';
    const preAuthUrl = url + qs.stringify(params);
    ctx.body = await ctx.renderView('authorization.ejs', {
      preAuthUrl: preAuthUrl
    });
  }
  async detail() {
    //获取用户的appList
    const {
      ctx
    } = this;
    const result = await ctx.httpGet(ctx.app.config.host.path + '/api/server/user/appList?id=' + ctx.session.user.id);
    const list = result.result;
    let appId = '';
    if (ctx.session.appId) {
      appId = ctx.session.appId;
    } else {
      appId = list && list[0] && list[0].id || 'not found';
    }

    ctx.body = await ctx.renderView('index.ejs', {
      appId: appId,
      appList: list || []
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
