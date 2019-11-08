'use strict'
const routerWeixin = require('./routes/weixin')
const routerProxy = require('./routes/proxy')

/**  @param {Egg.Application} app */
module.exports = app => {
  const { router, controller } = app

  routerWeixin(app)
  routerProxy(app)
  router.get('/', controller.home.index)
}
