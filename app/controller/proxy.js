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
}

module.exports = ProxyController
