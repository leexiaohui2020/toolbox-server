'use strict'
const moment = require('moment');
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

  // 统计用户增加情况
  async countUserData() {
    const { ctx } = this;
    // 今天
    const currentDateStr = moment().format('YYYY/MM/DD');
    const currentDate = new Date(currentDateStr);
    // 本周第一天
    const firstDateOfWeek = new Date(currentDateStr);
    firstDateOfWeek.setDate(firstDateOfWeek.getDate() - firstDateOfWeek.getDay());
    // 本月第一天
    const firstDateOfMonth = new Date(currentDateStr);
    firstDateOfMonth.setDate(1);

    const userdata = [
      // 今日新增
      {
        label: '今日新增',
        count: await ctx.model.User.countDocuments({
          createdAt: { $gte: currentDate },
        }),
      },
      // 本周新增
      {
        label: '本周新增',
        count: await ctx.model.User.countDocuments({
          createdAt: { $gte: firstDateOfWeek },
        }),
      },
      // 本月新增
      {
        label: '本月新增',
        count: await ctx.model.User.countDocuments({
          createdAt: { $gte: firstDateOfMonth },
        }),
      },
    ];
    const countUser = await ctx.model.User.countDocuments();
    return { countUser, userdata };
  }
}

module.exports = UserService
