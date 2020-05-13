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

  async createGif({ id, input }) {
    const { ctx } = this
    const url = `https://nz.qqtn.com/zbsq/index.php?m=api&c=make_gif&a=create&id=${id}&inputs=${input}&is_water=0`
    const { data } = await ctx.curl(url, { dataType: 'json' })
    if (data.code !== 1) return new Error(data.msg)
    return data.data
  }

  /** 获取Bilibili视频封面 */
  async getBilibiliAvCover({ avNumber }) {
    const { ctx } = this
    const url = `http://www.atoolbox.net/api/GetBilibiliAVCover.php?AV_number=${avNumber}`
    const { data } = await ctx.curl(url, {
      dataType: 'text',
      timeout: 60000
    })
    return data
  }

  /**
   * 标准中文电码查询
   * @param {Object} param0
   * @param {String} param0.content
   */
  async getChineseCommercialCode({ content }) {
    const { ctx } = this
    const url = `http://www.atoolbox.net/api/GetChineseCommercialCode.php?ch=${content}`
    const { data } = await ctx.curl(url, { dataType: 'json' })
    return data
  }

  /**
   * 动物识别接口
   * @param {Object} param0 
   * @param {String} param0.img - 图片Base64数据
   */
  async getAnimalClassifyInfo({ img }) {
    const { ctx } = this;
    const { data: res } = await ctx.curl('http://www.atoolbox.net/Api/GetAnimalClassifyInfo.php', {
      method: 'POST',
      data: {
        img,
      },
      dataType: 'json',
    });
    const { result } = res.data;
    return result;
  }
}

module.exports = ProxyService
