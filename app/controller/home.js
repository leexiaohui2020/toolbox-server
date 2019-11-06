'use strict'
const Controller = require('egg').Controller

class HomeController extends Controller {

  async index() {
    const { ctx } = this
    ctx.type = 'application/json'
    ctx.body = { status: 'ok' }
  }
}

module.exports = HomeController
