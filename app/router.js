'use strict';

/**
 * @param {Egg.Application} app - egg application
 */


module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/', controller.home.login);
  router.get('/404', controller.home.nofound);
  router.get('/login', controller.home.login);
  router.get(/\/customer\/*/, app.middlewares.auth(), controller.home.detail);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/logout', controller.user.logout); 
};
