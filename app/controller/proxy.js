'use strict'
const Controller = require('egg').Controller

class ProxyController extends Controller {

  async getBingWallPaper() {
    const { ctx, app } = this
    app.validator.validate({
      date: { type: 'date' },
      size: { type: 'string', format: /^[\d+]x[\d+]$/ }
    }, ctx.query)
    ctx.type = 'image/jpg'
    ctx.body = await ctx.service.proxy.getBingWallPaper(ctx.query)
  }

  async createGif() {
    const { ctx } = this
    ctx.validate({
      id: { type: 'int' },
      input: { type: 'string' }
    })
    const data = await ctx.service.proxy.createGif(ctx.request.body)
    if (data instanceof Error) return ctx.body = { status: 'err', errmsg: data.message }
    ctx.body = { status: 'ok', data }
  }

  async getBilibiliAvCover() {
    const { ctx } = this
    ctx.validate({
      avNumber: { type: 'string' }
    })
    const data = await ctx.service.proxy.getBilibiliAvCover(ctx.request.body)
    ctx.body = { status: 'ok', data }
  }

  async getChineseCommercialCode() {
    const { ctx } = this
    ctx.validate({
      content: { type: 'string' }
    })
    const data = await ctx.service.proxy.getChineseCommercialCode(ctx.request.body)
    ctx.body = { status: 'ok', data }
  }

  // 动物识别接口
  async getAnimalClassifyInfo() {
    const { ctx } = this;
    ctx.validate({
      img: { type: 'string' },
    });
    ctx.handler(await ctx.service.proxy.getAnimalClassifyInfo(ctx.request.body));
  }
  
  // 植物识别接口
  async getPlantClassifyInfo() {
    const { ctx } = this;
    ctx.validate({
      img: { type: 'string' },
    });
    ctx.handler(await ctx.service.proxy.getPlantClassifyInfo(ctx.request.body));
  }

  // 诺基亚短信图片生成接口
  async getNokiaMessageImage() {
    const { ctx } = this;
    ctx.validate({
      sms: { type: 'string' },
    });
    ctx.handler(await ctx.service.proxy.getNokiaMessageImage(ctx.request.body));
  }

  // 随机获取文章的一句话
  async getArticleRandOne() {
    const { ctx } = this;
    ctx.validate({
      category: { type: 'int' },
    });
    ctx.handler(await ctx.service.proxy.getArticleRandOne(ctx.request.body));
  }
}

module.exports = ProxyController
