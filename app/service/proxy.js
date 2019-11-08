'use strict'
const Service = require('egg').Service

class ProxyService extends Service {

  /**
   * 获取必应每日壁纸
   * @param {Object} opts 
   * @param {String} opts.date - 日期
   * @param {String} opts.size - 分辨率
   */
  async getBingWallPaper(opts = {}) {
    const { ctx } = this
    const date = new Date(opts.date)
    const now = new Date()
    const i = Math.floor((now - date) / (1000 * 60 * 60 * 24))
    const r = opts.size
    const { data } = await ctx.curl(`http://www.atoolbox.net/api/GetBingWallpaper.php?i=${i}&r=${r}`, {
      dataType: 'text'
    })
    return data
  }
}

module.exports = ProxyService
