'use strict';
const Controller = require('egg').Controller;

class ShipuController extends Controller {

  // 获取食谱秀食材分类
  async menu() {
    const { ctx } = this;
    ctx.handler(await ctx.service.shipu.menu());
  }

  // 获取食谱秀食材分类详情
  async getMenuItem() {
    const { ctx } = this;
    ctx.validate({ id: { type: 'string' } });
    ctx.handler(await ctx.service.shipu.getMenuItem(ctx.request.body));
  }

  // 获取食谱秀食材做法大全
  async getItemDetail() {
    const { ctx } = this;
    ctx.validate({ id: { type: 'string' } });
    ctx.handler(await ctx.service.shipu.getItemDetail(ctx.request.body));
  }

  // 获取食谱秀菜谱做法
  async getCaiPu() {
    const { ctx } = this;
    ctx.validate({ id: { type: 'string' } });
    ctx.handler(await ctx.service.shipu.getCaiPu(ctx.request.body));
  }
}

module.exports = ShipuController;
