'use strict'
/**  @param {Egg.Application} app */
module.exports = app => {
  const { router, controller } = app
  router.get('/proxy/getBingWallPaper', controller.proxy.getBingWallPaper)
  router.post('/proxy/getBilibiliAvCover', controller.proxy.getBilibiliAvCover)
  router.post('/proxy/createGif', controller.proxy.createGif)
  router.post('/proxy/getChineseCommercialCode', controller.proxy.getChineseCommercialCode)
  router.post('/proxy/getAnimalClassifyInfo', controller.proxy.getAnimalClassifyInfo)
  router.post('/proxy/getPlantClassifyInfo', controller.proxy.getPlantClassifyInfo)
}
