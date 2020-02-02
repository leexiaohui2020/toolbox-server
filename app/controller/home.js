'use strict'
const md5 = require('md5');
const Identicon = require('identicon.js');
const Controller = require('egg').Controller

class HomeController extends Controller {

  async index() {
    const { ctx } = this
    ctx.type = 'application/json'
    ctx.body = { status: 'ok' }
  }

  async identicon() {
    const { ctx, app } = this
    app.validator.validate({
      id: { type: 'string' },
      size: { type: 'int', required: false, default: 420, min: 1 }
    }, ctx.query)
    const base64 = new Identicon(md5(ctx.query.text), ctx.query.size).toString()
    ctx.type = 'image/png'
    ctx.body = Buffer.from(base64, 'base64')
  }
}

module.exports = HomeController
