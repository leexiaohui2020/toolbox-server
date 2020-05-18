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
    await this.addValidateRules()
  }

  // 添加自定义验证规则
  async addValidateRules() {
    const { validator } = this.app;
    
  }
}

module.exports = AppBootHool
