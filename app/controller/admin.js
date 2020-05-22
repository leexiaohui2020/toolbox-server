'use strict';
const Controller = require('egg').Controller;

class AdminController extends Controller {

  // 管理员登录
  async login() {
    const { ctx } = this;
    ctx.validate({
      username: { type: 'string' },
      password: { type: 'string' },
    });
    ctx.handler(await ctx.service.admin.login(ctx.request.body));
  }

  // 首页数据
  async homeData() {
    const { ctx } = this;
    ctx.handler(await ctx.service.admin.homeData());
  }
}

module.exports = AdminController;
