'use strict';

const Service = require('egg').Service;

class AdminService extends Service {

  // 管理员登录
  async login(opts = {}) {
    const { ctx } = this;
    const { username, password } = opts;
    const admin = await ctx.model.Admin.findOne({ username });

    if (!admin) return new Error('管理员不存在');
    if (!admin.authPass(password)) return new Error('密码错误');
    const token = await admin.createToken();
    ctx.logger.info('管理员 %s 登录', username);
    return { token };
  }

  // 首页数据
  async homeData() {
    const { ctx } = this;
    return Object.assign(
      // 用户数据
      await ctx.service.user.countUserData(),
    );
  }
}

module.exports = AdminService;
