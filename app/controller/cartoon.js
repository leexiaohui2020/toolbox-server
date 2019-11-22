'use strict'
const Controller = require('egg').Controller

class CartoonController extends Controller {

  async getOptions() {
    const { ctx } = this
    const data = await ctx.service.cartoon.getOptions()
    ctx.body = { status: 'ok', data }
  }

  async getList() {
    const { ctx } = this
    ctx.validate({
      page: { type: 'int' },
      pagesize: { type: 'int' },
      tagid: { type: 'int' },
      areaid: { type: 'int' },
      status: { type: 'int' },
      usergroup: { type: 'int' },
      sort: { type: 'int' }
    })
    const data = await ctx.service.cartoon.getList(ctx.request.body)
    ctx.body = { status: 'ok', data }
  }

  async getUrlKey() {
    const { ctx } = this
    ctx.validate({
      mid: { type: 'int' }
    })
    const data = await ctx.service.cartoon.getUrlKey(ctx.request.body)
    ctx.body = { status: 'ok', data }
  }
  
  async getChapter() {
    const { ctx } = this
    ctx.validate({
      mid: { type: 'int' }
    })
    const data = await ctx.service.cartoon.getChapter(ctx.request.body)
    ctx.body = { status: 'ok', data }
  }
  
  async getComment() {
    const { ctx } = this
    ctx.validate({
      mid: { type: 'int' },
      page: { type: 'int' },
      pagesize: { type: 'int' }
    })
    const data = await ctx.service.cartoon.getComment(ctx.request.body)
    ctx.body = { status: 'ok', data }
  }
  
  async getPaper() {
    const { ctx } = this
    ctx.validate({
      link: { type: 'string' }
    })
    const data = await ctx.service.cartoon.getPaper(ctx.request.body)
    ctx.body = { status: 'ok', data }
  }

  async getImage() {
    const { ctx, app } = this
    app.validator.validate({
      url: { type: 'string' },
      userAgent: { type: 'string' }
    }, ctx.query)
    const { url, userAgent } = ctx.query
    const { data } = await ctx.curl(url, {
      timeout: 60000,
      headers: {
        referer: 'http://m.1kkk.com/',
        "user-agent": decodeURIComponent(userAgent)
      }
    })
    ctx.type = 'image/png'
    ctx.body = data
  }
}

module.exports = CartoonController
