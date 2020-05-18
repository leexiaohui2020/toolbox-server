'use strict'
/**  @param {Egg.Application} app */
module.exports = app => {
  const { router, controller } = app
  router.post('/api/user/login', controller.user.login)
  router.post('/api/user/setUserInfo', controller.user.setUserInfo)

  router.post('/api/wish/push', controller.wish.push)
  router.post('/api/wish/list', controller.wish.list)
  router.post('/api/wish/like', controller.wish.like)
}
