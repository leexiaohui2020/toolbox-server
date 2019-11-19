'use strict'
const Controller = require('egg').Controller

class YudansController extends Controller {

  async getList() {
    const { ctx } = this
    ctx.validate({
      page: { type: 'int' },
      pagesize: { type: 'int' },
      keyword: { type: 'string', required: false } 
    })
    const data = await ctx.service.yudans.getList(ctx.request.body)
    ctx.body = { status: 'ok', data }
  }

  async getDetail() {
    const { ctx } = this
    ctx.validate({
      no: { type: 'int' }
    })
    const data = await ctx.service.yudans.getDetail(ctx.request.body)
    ctx.body = { status: 'ok', data }
  }

  async getPic() {
    const { ctx } = this
    const { id } = ctx.params
    ctx.body = `https://yudans.net/resources/nav_pic/${id}@2x.jpg`
  }

  async getMp3() {
    const { ctx } = this
    const { id } = ctx.params
    ctx.body = `https://yudans.net/resources/mp3/${id}.mp3`
  }
}

module.exports = YudansController
