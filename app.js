'use strict'
class AppBootHool {

  constructor(app) {
    this.app = app
  }

  async didReady() {
    const { app } = this
    const ctx = await app.createAnonymousContext()
    await app.runSchedule('bing-paper')
    await app.runSchedule('yudans-music')
  }
}

module.exports = AppBootHool
