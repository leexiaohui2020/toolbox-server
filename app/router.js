'use strict'
const routerWeixin = require('./routes/weixin')

/**  @param {Egg.Application} app */
module.exports = app => {
  const { router, controller } = app

  routerWeixin(app)
  router.get('/', controller.home.index)
}
