'use strict'
class AppBootHool {

  constructor(app) {
    this.app = app
  }

  async didReady() {
    const { app } = this
    const ctx = await app.createAnonymousContext()
    await app.runSchedule('bing-paper')
    await app.runSchedule('yudans-music')
    await this.addValidateRules()
    await this.createTheFirstAdmin(ctx)
    await this.serviceTest(ctx)
  }

  // 添加自定义验证规则
  async addValidateRules() {
    const { validator } = this.app;
  }

  // 创建第一个管理员
  async createTheFirstAdmin(ctx) {
    const count = await ctx.model.Admin.countDocuments()
    if (count === 0) {
      const admin = await ctx.model.Admin.create({
        username: 'leexiaohui',
        password: 'gh123456',
      });
      const testAdmin = await ctx.model.Admin.create({
        username: 'testAdmin',
        password: 'test123456',
      });

      ctx.logger.info('创建了管理员：%j', admin);
      ctx.logger.info('创建了测试管理员：%j', testAdmin);
    }
  }

  // 接口测试
  async serviceTest(ctx) {
    const info = ctx.logger.info.bind(ctx.logger);
    // 获取食谱秀食材分类 ✔
    // info(await ctx.service.shipu.menu());

    // 获取食谱秀食材分类详情 ✔
    // info(await ctx.service.shipu.getMenuItem({ id: '/shicaimore-01002.html' }));

    // 获取食谱秀食材做法大全 ✔
    // info(await ctx.service.shipu.getItemDetail({ id: '/shicai-01-1.html' }));

    // 获取菜谱做法 ✔
    // info(await ctx.service.shipu.getCaiPu({ id: '/caipu/52964/' } ));
  }
}

module.exports = AppBootHool
