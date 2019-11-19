'use strict'
const routerWeixin = require('./routes/weixin')
const routerProxy = require('./routes/proxy')
const routerApi = require('./routes/api')
const routerYudans = require('./routes/yudans')

/**  @param {Egg.Application} app */
module.exports = app => {
  const { router, controller } = app

  routerWeixin(app)
  routerProxy(app)
  routerApi(app)
  routerYudans(app)
  router.get('/', controller.home.index)
}
