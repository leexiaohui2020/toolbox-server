'use strict'
const Controller = require('egg').Controller

class UserController extends Controller {

  async login() {
    const { ctx } = this
    ctx.validate({
      code: { type: 'string' }
    })
    const data = await ctx.service.user.login(ctx.request.body)
    if (data instanceof Error) {
      return ctx.body = { status: 'err', errmsg: data.message }
    }
    ctx.body = { status: 'ok', data }
  }

  async setUserInfo() {
    const { ctx } = this
    const { openid } = ctx.session
    if (!openid) {
      return ctx.body = {
        status: 'err',
        errmsg: '请先登录'
      }
    }
    const data = await ctx.service.user.setUserInfo(openid, ctx.request.body)
    if (data instanceof Error) {
      return ctx.body = { status: 'err', errmsg: data.message }
    }
    ctx.body = { status: 'ok', data }
  }
}

module.exports = UserController
