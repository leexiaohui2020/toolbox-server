'use strict'
const Controller = require('egg').Controller

class WeixinController extends Controller {

  async imgSecCheck() {
    const { ctx } = this
    ctx.validate({ img: { type: 'string', format: /^data:image\// } })
    const data = await ctx.service.weixin.security.imgSecCheck(ctx.request.body.img)
    if (data instanceof Error) return ctx.body = { status: 'err', errmsg: data.message }
    ctx.body = { status: 'ok', data }
  }

  async msgSecCheck() {
    const { ctx } = this
    ctx.validate({ content: { type: 'string' } })
    const data = await ctx.service.weixin.security.msgSecCheck(ctx.request.body.content)
    if (data instanceof Error) return ctx.body = { status: 'err', errmsg: data.message }
    ctx.body = { status: 'ok', data }
  }
}

module.exports = WeixinController
