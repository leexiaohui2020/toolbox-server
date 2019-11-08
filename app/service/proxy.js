'use strict'
const Service = require('egg').Service
const monent = require('moment')

class ProxyService extends Service {

  /**
   * 获取必应每日壁纸
   * @param {Object} opts 
   * @param {String} opts.date - 日期
   * @param {String} opts.size - 分辨率
   */
  async getBingWallPaper(opts = {}) {
    const { ctx } = this
    const date = monent(opts.date).format('YYYY-MM-DD')
    const item = await ctx.model.BingPaper.findOne({ date })
    const first = await ctx.model.BingPaper.find()
    const { data } = await ctx.curl((item || first).src += `${opts.size}.jpg`)
    return data
  }
}

module.exports = ProxyService
