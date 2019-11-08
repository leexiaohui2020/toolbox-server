'use strict'
const Service = require('egg').Service
const cheerio = require('cheerio')
const moment = require('moment')

class BingCrawlService extends Service {

  /**
   * 自动抓取数据库中没有的
   * 必应每日壁纸链接
   */
  async wallPaper() {
    const { ctx } = this
    const now = new Date()
    const crawlNext = async (p) => {
      const url = `https://bing.ioliu.cn/?p=${p}`
      const { data } = await ctx.curl(url, { dataType: 'text' })
      const $ = cheerio.load(data, { decodeEntities: false })
      const imgs = $('.progressive__img')
      for (let i = 0, ln = imgs.length; i < ln; i++) {
        const src = $(imgs[i]).attr('src').replace(/\d+x\d+\.\w+$/, '')
        if (await ctx.model.BingPaper.findOne({ src })) return
        const date = moment(now).format('YYYY-MM-DD')
        await ctx.model.BingPaper.create({ date, src })
        now.setDate(now.getDate() - 1)
      }
      await crawlNext(p + 1)
    }
    await crawlNext(1)
  }
}

module.exports = BingCrawlService
