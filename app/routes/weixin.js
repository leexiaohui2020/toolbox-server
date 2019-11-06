'use strict'
/**  @param {Egg.Application} app */
module.exports = app => {
  const { router, controller } = app
  router.post('/weixin/imgSecCheck', controller.weixin.imgSecCheck)
}
