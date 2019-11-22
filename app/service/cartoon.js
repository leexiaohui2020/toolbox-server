'use strict'
const Service = require('egg').Service
const cheerio = require('cheerio')

class CartoonService extends Service {

  /** 获取分类 */
  async getCates() {
    const { ctx } = this
    const url = 'http://www.1kkk.com/manhua-aiqing/'
    const { data } = await ctx.curl(url, { dataType: 'text' })
    const $ = cheerio.load(data, { decodeEntities: false })
    const cates = []
    $('#tags dd > a[data-id]').each((index, element) => {
      const id = $(element).data('id')
      const title = $(element).text()
      cates.push({ id, title })
    })
    return cates
  }

  /** 获取配置信息 */
  async getOptions() {
    const { config } = this
    const { cartoon } = config.toolbox
    const sortor = cartoon.sort
    const filter = []
    const cates = await this.getCates()

    filter.push({ id: 'areaid', title: '地区', group: cartoon.area })
    filter.push({ id: 'status', title: '进度', group: cartoon.status })
    filter.push({ id: 'usergroup', title: '受众', group: cartoon.usergroup })
    return { cates, filter, sortor }
  }

  async getList({
    page,
    pagesize,
    tagid,
    areaid,
    status,
    usergroup,
    sort
  }) {
    const { ctx } = this
    const url = 'http://www.1kkk.com/dm5.ashx?t=' + Date.now()
    const { data } = await ctx.curl(url, {
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: {
        pagesize,
        pageindex: page,
        tagid,
        areaid,
        status,
        usergroup,
        pay: 0,
        sort,
        action: 'getclasscomics'
      }
    })
    return data
  }

  async getUrlKey({ mid }) {
    const { ctx } = this
    const url = `http://www.1kkk.com/manhua-list-pay0/dm5.ashx?d=${Date.now()}&mid=${mid}&lt=1&action=getfirstchapterurl`
    const { data } = await ctx.curl(url, { dataType: 'json' })
    return data
  }

  async getChapter({ mid }) {
    const { ctx } = this
    const url = `http://www.1kkk.com/manhua${mid}/`
    const { data } = await ctx.curl(url, { dataType: 'text' })
    const $ = cheerio.load(data, { decodeEntities: false })
    const chapter = [], detail = {}
    $('#detail-list-select-1 li > a').each((index, element) => {
      const link = $(element).attr('href')
      const title = $(element).text().trim().replace(/\s+/g, ' ')
      chapter.push({ link, title })
    })

    detail.pictureUrl = $('.cover > img').attr('src')
    detail.title = $('.banner_detail .title').children()[0].prev.data.trim()
    detail.score = $('.banner_detail .score').text()
    detail.author = $('.banner_detail .subtitle > a').text()
    detail.status = $('.banner_detail .tip > span:first-child > span').text()
    detail.cates = Array.from($('.banner_detail .tip > span:nth-child(2) span').map((i, e) => $(e).text()))

    const prefix = $('.banner_detail .content').children()[0]
    const suffix = $('.banner_detail .content > span').children()[0]
    detail.content = ''
    prefix && (detail.content += prefix.prev.data)
    suffix && (detail.content += suffix.prev.data)
    if (!detail.content) {
      detail.content = $('.banner_detail .content').text()
    }

    return { detail, chapter }
  }

  async getComment({ mid, page, pagesize }) {
    const { ctx } = this
    const url = `http://www.1kkk.com/manhua39083/pagerdata.ashx?d=${Date.now}&pageindex=${page}&pagesize=${pagesize}&mid=${mid}&t=4`
    const { data } = await ctx.curl(url, { dataType: 'json' })
    return data
  }

  async getPaper({ link }) {
    const { ctx } = this
    const url = `http://m.1kkk.com/${link}/`
    const { data } = await ctx.curl(url, { dataType: 'text', headers: { "user-agent": 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.3 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1 wechatdevtools/1.02.1911152 MicroMessenger/7.0.4 Language/zh_CN webview/' } })
    
    return await new Promise(resolve => {
      const $ = cheerio.load(data, { decodeEntities: false })
      const title = $('.view-fix-top-bar-title').children()[0].prev.data
      const callback = paper => resolve({ paper, title: title.substr(0, title.length - 1) })
      $('script[type="text/javascript"]').each((index, element) => {
        const text = $(element).html().trim()
        if (!/^eval/.test(text)) return
        const content = text.substring(5, text.length - 1)
        eval(`eval(${content} + "callback(newImgs)")`)
      })
    })
  }
}

module.exports = CartoonService
