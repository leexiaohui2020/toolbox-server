'use strict'
const Service = require('egg').Service
const cheerio = require('cheerio')

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
    const raws = await ctx.model.YudansMusic.find(query, {
      __v: 0,
      _id: 0,
      createdAt: 0,
      updatedAt: 0
    }).skip((page - 1) * pagesize).limit(pagesize).sort({ no: -1 })
    const total = await ctx.model.YudansMusic.countDocuments(query)
    const list = raws.map(item => {
      return Object.assign({}, item.toObject(), {
        titleHtml: keyword ? item.title.replace(RegExp(keyword, 'ig'), re => `<span class="text-theme">${re}</span>`) : item.title,
        authorHtml: keyword ? item.author.replace(RegExp(keyword, 'ig'), re => `<span class="text-theme">${re}</span>`) : item.author
      })
    })
    return { page, pagesize, list, total }
  }

  async getDetail({ no }) {
    const { ctx } = this
    const song = await ctx.model.YudansMusic.findOne({ no }, {
      __v: 0,
      _id: 0,
      createdAt: 0,
      updatedAt: 0
    })
    return song
  }

  async getComment({ no, nextpagetoken }) {
    const { ctx } = this
    const music = await ctx.model.YudansMusic.findOne({ no })
    if (!music) return new Error('该乐曲未上线')
    const { videoid } = music
    const url = `https://yudans.net/${no}`
    const { data } = await ctx.curl(url, {
      method: 'POST',
      dataType: 'text',
      data: {
        videoid,
        nextpagetoken,
        action: 'ytcm_more',
      }
    })
    const $ = cheerio.load(data, { decodeEntities: false })
    const comments = []
    $('.comment_row').each((index, element) => {
      const avatarUrl = $('img', element).attr('src')
      const list = $('span', element).html().split('<br>')
      const nickName = list[0]
      const content = list.slice(1).map(text => `<p>${text}</p>`).join('')
      comments.push({ avatarUrl, nickName, content })
    })
    const token = $('.comment_showmore').data('id')
    return { comments, token }
  }
}

module.exports = YudansService
