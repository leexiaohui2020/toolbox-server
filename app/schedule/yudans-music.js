'use strict'
const Subscription = require('egg').Subscription

class YudansMusicCrawl extends Subscription {

  static get schedule() {
    return {
      cron: '0 0 6 * * ?',
      type: 'worker'
    }
  }

  async subscribe() {
    await this.ctx.service.crawl.yudans.music()
  }
}

module.exports = YudansMusicCrawl
