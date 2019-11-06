'use strict'
const Service = require('egg').Service

class SecurityService extends Service {

  async imgSecCheck(imgBase64) {
    const { ctx } = this
    const token = await ctx.service.weixin.token.getToken()
    if (token instanceof Error) return token
    const url = `https://api.weixin.qq.com/wxa/img_sec_check?access_token=${token}`
    const { data } = await ctx.curl(url, {
      method: 'POST',
      dataType: 'json',
      data: {
        access_token: token,
      },
      files: {
        media: Buffer.from(imgBase64, 'base64')
      }
    })
    if (data.errCode !== 0) {
      return new Error(data.errMsg)
    }
  }
}

module.exports = SecurityService
