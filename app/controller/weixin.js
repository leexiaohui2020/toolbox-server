'use strict'
const Controller = require('egg').Controller

class WeixinController extends Controller {

  async imgSecCheck() {
    this.validate({ img: { type: 'string', format: /^data:image\// } })
    const { ctx } = this
    const data = await ctx.service.weixin.security.imgSecCheck(ctx.request.body.img)
    if (data instanceof Error) return ctx.body = { status: 'err', errmsg: data.message }
    ctx.body = { status: 'ok', data }
  }
}

module.exports = WeixinController
