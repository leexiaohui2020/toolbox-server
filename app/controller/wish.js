'use strict';
const Controller = require('egg').Controller;

class WishController extends Controller {

  async push() {
    const { ctx } = this;
    ctx.validate({
      userId: { type: 'string' },
      type: { type: 'string' },
      city: { type: 'string' },
      born: { type: 'string' },
      gender: { type: 'string' },
      conste: { type: 'string' },
      name: { type: 'string' },
      content: { type: 'string' },
    });
    ctx.handler(await ctx.service.wish.push(ctx.request.body));
  }

  async list() {
    const { ctx } = this;
    ctx.validate({
      page: { type: 'int', min: 1, required: false, default: 1 },
      pagesize: { type: 'int', min: 1, required: false, default: 10 },
      keyword: { type: 'string', required: false },
    });
    ctx.handler(await ctx.service.wish.list(ctx.request.body));
  }

  async like() {
    const { ctx } = this;
    ctx.validate({
      userId: { type: 'string' },
      wishId: { type: 'string' },      
    });
    ctx.handler(await ctx.service.wish.like(ctx.request.body));
  }
}

module.exports = WishController;
