'use strict'
/**  @param {Egg.Application} app */
module.exports = app => {
  const { router, controller } = app
  router.get('/proxy/getBingWallPaper', controller.proxy.getBingWallPaper)
  router.post('/proxy/getBilibiliAvCover', controller.proxy.getBilibiliAvCover)
  router.post('/proxy/createGif', controller.proxy.createGif)
}
