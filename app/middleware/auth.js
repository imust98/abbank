module.exports = (options, app) => {
  return async function (ctx, next) {
    if (!ctx.session.user) {
      return ctx.redirect('/');
    }
    ctx.logger.info('user authorizationTag : %j', ctx.session.user);
    const result = await ctx.httpGet(ctx.app.config.host.path+'/api/server/user/info', {
      data: {
        userName: ctx.session.user.userName,
        userFullName: ctx.session.user.userFullName
      }
    });
    const {
      result:info
    } = result;

    if(!info.authorizationTag && ctx.originalUrl !=='/authorization') {
      return ctx.redirect('/authorization');
    }
    await next();
  }
}
