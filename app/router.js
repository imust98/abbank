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
  router.post('/api/:type/add', controller.customer.create); 
  router.get('/api/:type/list', controller.customer.list); 
  router.delete('/api/:type/delete/:id', controller.customer.delete); 
  router.put('/api/:type/:id', controller.customer.update); 
  router.get('/api/:type/:id', controller.customer.item); 
  // router.post('/api/company/add', controller.company.create); 
  // router.post('/api/company/credit/:id', controller.company.addCredit); 
  // router.get('/api/company/list', controller.company.list); 
  // router.delete('/api/company/delete/:id', controller.company.delete); 
  // router.put('/api/company/:id', controller.company.update); 
  // router.get('/api/company/:id', controller.company.item); 
  router.get('/api/:type/ppp/download',controller.customer.download)
};
