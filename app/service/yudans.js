'use strict'
const Service = require('egg').Service

class YudansService extends Service {

  async getList({ page, pagesize, keyword }) {
    const { ctx } = this
    const query = {}
    if (keyword) {
      query.$or = [
        { title: { $regex: RegExp(keyword, 'i') } },
        { author: { $regex: RegExp(keyword, 'i') } }
      ]
    }
    const list = await ctx.model.YudansMusic.find(query, {
      __v: 0,
      _id: 0,
      createdAt: 0,
      updatedAt: 0
    }).skip((page - 1) * pagesize).limit(pagesize).sort({ no: -1 })
    const total = await ctx.model.YudansMusic.countDocuments(query)
    if (keyword) {
      list.forEach(item => {
        item.title = item.title.replace(RegExp(keyword, 'ig'), re => `<span class="text-theme">${re}</span>`)
        item.author = item.author.replace(RegExp(keyword, 'ig'), re => `<span class="text-theme">${re}</span>`)
      })
    }
    return { page, pagesize, list, total }
  }
}

module.exports = YudansService
