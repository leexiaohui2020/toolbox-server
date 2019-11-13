'use strict'
const Service = require('egg').Service

class UserService extends Service {

  /**
   * 用户注册
   * @param {Object} opts
   * @param {String} opts.openid
   */
  async regist(opts = {}) {
    const { ctx } = this
    const { openid } = opts
    if (await ctx.model.User.findOne({ openid })) {
      ctx.logger.info('用户 %s 已经注册过了', openid)
      return new Error('用户已经注册过了')
    }
    return await ctx.model.User.create({ openid })
  }

  /**
   * 用户微信登录
   * @param {Object} opts
   * @param {String} opts.code
   */
  async login(opts = {}) {
    const { ctx, config } = this
    const { code } = opts
    const { appId, appSecret } = config.toolbox
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
    const { data } = await ctx.curl(url, { dataType: 'json' })
    if (data.errcode) {
      return new Error(data.errmsg)
    }
    const { openid } = data
    const returnHandler = (user) => {
      ctx.session.openid = user.openid
      return user
    }
    return returnHandler(await ctx.model.User.findOne({ openid }) || await this.regist({ openid }))
  }

  /**
   * 设置用户信息
   */
  async setUserInfo(openid, userInfo) {
    const { ctx } = this
    const user = await ctx.model.User.findOne({ openid })
    if (!user) return new Error('用户不存在')
    await user.updateOne({ $set: { userInfo } })
  }
}

module.exports = UserService
