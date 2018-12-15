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
  router.get(/^\/user\/*/, app.middlewares.auth(), controller.home.detail);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/logout', controller.user.logout); 
  router.post('/api/user/add', controller.user.create); 
  router.delete('/api/user/:id', controller.user.delete); 
  router.put('/api/user/:id', controller.user.update); 
  router.get('/api/user/list', controller.user.list); 
  router.post('/api/:type/add', controller.customer.create); 
  router.get('/api/:type/list', controller.customer.list); 
  router.delete('/api/:type/delete/:id', controller.customer.delete); 
  router.put('/api/:type/:id', controller.customer.update); 
  router.get('/api/:type/:id', controller.customer.item); 
  router.get('/api/:type/res/download',controller.customer.download)
};
