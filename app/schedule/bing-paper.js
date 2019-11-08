'use strict'
const Subscription = require('egg').Subscription

class BingPaperCrawl extends Subscription {

  static get schedule() {
    return {
      cron: '0 0 6 * * ?',
      type: 'worker'
    }
  }

  async subscribe() {
    await this.ctx.service.crawl.bing.wallPaper()
  }
}

module.exports = BingPaperCrawl
