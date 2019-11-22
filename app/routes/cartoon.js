'use strict'
/**  @param {Egg.Application} app */
module.exports = app => {
  const { router, controller } = app
  router.post('/cartoon/search', controller.cartoon.search)
  router.post('/cartoon/getList', controller.cartoon.getList)
  router.post('/cartoon/getPaper', controller.cartoon.getPaper)
  router.post('/cartoon/getUrlKey', controller.cartoon.getUrlKey)
  router.post('/cartoon/getComment', controller.cartoon.getComment)
  router.post('/cartoon/getChapter', controller.cartoon.getChapter)
  router.post('/cartoon/getOptions', controller.cartoon.getOptions)

  router.get('/cartoon/getImage', controller.cartoon.getImage)
}
