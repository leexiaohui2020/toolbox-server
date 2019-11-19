'use strict'
const Service = require('egg').Service
const cheerio = require('cheerio')

class YudansCrawlService extends Service {

  async music() {
    const { ctx } = this
    const getNetPage = async (offset = '') => {
      const url = `https://yudans.net/?offset=${offset}`
      const { data } = await ctx.curl(url, { timeout: 60000, dataType: 'text' })
      const $ = cheerio.load(data, { decodeEntities: false })
      const list = []
      $('a[data-id]').each((index, elemnt) => {
        const no = +$(elemnt).data('id')
        const [author, title] = $('span:first-child', elemnt).text().split(/\s+\-\s+/)
        const type = $('.remark', elemnt).text().split(/\s+\-\s+/)[1].replace(/琴譜\s*$/, '')
        list.push({ no, title, type, author })
      })
      for (const item of list) {
        if (await ctx.model.YudansMusic.findOne({ no: item.no })) {
          return
        }
        await ctx.model.YudansMusic.create(item)
        ctx.logger.info('新增一首鱼蛋村纯音乐，[%s/%s]%s - %s', item.no, item.type, item.author, item.title)
      }

      if (list.length) {
        const nextOffset = list[list.length - 1].no
        await getNetPage(nextOffset)
      }
    }

    await getNetPage()
  }
}

module.exports = YudansCrawlService
