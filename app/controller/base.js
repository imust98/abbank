const {
  Controller
} = require('egg');

class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }
  setModel({
    result,
    code = 200,
    msg = 'success'
  }) {
    this.ctx.body = {
      code: code,
      msg: msg,
      result: result
    }
  }
  notfound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}

module.exports = BaseController;
