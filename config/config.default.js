'use strict';
/** @param {Egg.EggAppInfo} appInfo */
module.exports = appInfo => {
  const config = exports = {}
  config.keys = `${appInfo.name}_1573021756112_3991`
  config.middleware = []

  config.security = {
    csrf: false
  }

  config.toolbox = {
    appId: 'wxa3a1ed7e9913ca17',
    appSecret: '2747c603d324663f653b2da9f7d05258',

    cartoon: {
      area: [
        { id: 35, title: '港台' },
        { id: 36, title: '日韩' },
        { id: 37, title: '大陆' },
        { id: 52, title: '欧美' }
      ],
      status: [
        { id: 1, title: '连载' },
        { id: 2, title: '完结' }
      ],
      usergroup: [
        { id: 1, title: '少年向' },
        { id: 2, title: '少女向' },
        { id: 3, title: '青年向' }
      ],
      sort: [
        { id: 2, title: '更新时间' },
        { id: 10, title: '热门人气' },
        { id: 18, title: '新品上架' }
      ]
    }
  }

  config.mongoose = {
    url: 'mongodb://localhost:27017/TOOLBOX-VERSION-1',
    options: {
      useUnifiedTopology: true
    }
  }

  return config
}
