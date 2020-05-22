'use strict'
/**  @param {Egg.Application} app */
module.exports = app => {
  const { router, controller } = app;
  const authAdmin = app.middleware.authAdmin();

  router.post('/admin/login', controller.admin.login);
  router.post('/admin/homeData', authAdmin, controller.admin.homeData);
};
