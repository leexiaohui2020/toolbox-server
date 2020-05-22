'use strict'
const routerWeixin = require('./routes/weixin')
const routerProxy = require('./routes/proxy')
const routerApi = require('./routes/api')
const routerYudans = require('./routes/yudans')
const routerCartoon = require('./routes/cartoon')
const routerAdmin = require('./routes/admin')

/**  @param {Egg.Application} app */
module.exports = app => {
  const { router, controller } = app

  routerWeixin(app)
  routerProxy(app)
  routerApi(app)
  routerYudans(app)
  routerCartoon(app)
  routerAdmin(app)
  
  router.get('/', controller.home.index)
  router.get('/identicon', controller.home.identicon)
}
