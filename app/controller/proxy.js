'use strict'
const Controller = require('egg').Controller

class ProxyController extends Controller {

  async getBingWallPaper() {
    const { ctx, app } = this
    app.validator.validate({
      date: { type: 'date' },
      size: { type: 'string', format: /^[\d+]x[\d+]$/ }
    }, ctx.query)
    ctx.body = await ctx.service.proxy.getBingWallPaper(ctx.query)
  }
}

module.exports = ProxyController
