'use strict'
/**  @param {Egg.Application} app */
module.exports = app => {
  const { router, controller } = app
  router.get('/proxy/getBingWallPaper', controller.proxy.getBingWallPaper)
}
