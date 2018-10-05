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
  router.post('/api/person/add', controller.person.create); 
  router.post('/api/person/credit/:id', controller.person.addCredit); 
  router.get('/api/person/list', controller.person.list); 
  router.delete('/api/person/delete/:id', controller.person.delete); 
  router.put('/api/person/:id', controller.person.update); 
  router.get('/api/person/:id', controller.person.item); 
  router.post('/api/company/add', controller.company.create); 
  router.post('/api/company/credit/:id', controller.company.addCredit); 
  router.get('/api/company/list', controller.company.list); 
  router.delete('/api/company/delete/:id', controller.company.delete); 
  router.put('/api/company/:id', controller.company.update); 
  router.get('/api/company/:id', controller.company.item); 
};
