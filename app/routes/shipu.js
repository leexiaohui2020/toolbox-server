'use strict'
/**  @param {Egg.Application} app */
module.exports = app => {
  const { router, controller } = app;

  // 获取食谱秀食材分类
  router.post('/shipu/menu', controller.shipu.menu);

  // 获取食谱秀食材分类详情
  router.post('/shipu/getMenuItem', controller.shipu.getMenuItem);

  // 获取食谱秀食材做法大全
  router.post('/shipu/getItemDetail', controller.shipu.getItemDetail);

  // 获取食谱秀菜谱做法
  router.post('/shipu/getCaiPu', controller.shipu.getCaiPu);
};
