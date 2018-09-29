module.exports = (options, app) => {
  return async function (ctx, next) {
    if (!ctx.session.user) {
      return ctx.redirect('/');
    }
    await next();
  }
}
