'use strict'
/**  @param {Egg.Application} app */
module.exports = app => {
  const { router, controller } = app
  router.post('/yudans/list', controller.yudans.getList)
  router.get('/yudans/pic/:id', controller.yudans.getPic)
  router.get('/yudans/mp3/:id', controller.yudans.getMp3)
}
