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
      url: { type: 'string' }
    }, ctx.query)
    const url = ctx.query.url
    const { data } = await ctx.curl(url, {
      timeout: 60000,
      headers: {
        referer: 'http://m.1kkk.com/',
        "user-agent": 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.3 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1 wechatdevtools/1.02.1911152 MicroMessenger/7.0.4 Language/zh_CN webview/'
      }
    })
    ctx.type = 'image/png'
    ctx.body = data
    console.info(ctx.request.headers['user-agent'])
  }
}

module.exports = CartoonController
