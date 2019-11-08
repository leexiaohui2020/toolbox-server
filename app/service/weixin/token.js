'use strict'
const Service = require('egg').Service

let token = null
class TokenService extends Service {

  async getToken() {
    if (token && token.expiresTime > new Date()) {
      return token.accessToken
    }
    const data = await this.updateToken()
    if (data instanceof Error) return data
    return token = data, data.accessToken
  }

  async updateToken() {
    const { ctx, config } = this
    const { appId, appSecret } = config.toolbox
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`
    const { data } = await ctx.curl(url, { dataType: 'json' })
    if (data.errcode && data.errcode !== 0) {
      ctx.logger.info(data)
      return new Error(data.errmsg)
    }
    const accessToken = data.access_token
    const expiresTime = new Date(Date.now() + data.expires_in * 1000)
    return { accessToken, expiresTime }
  }
}

module.exports = TokenService
