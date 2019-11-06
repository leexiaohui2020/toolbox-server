'use strict';
/** @param {Egg.EggAppInfo} appInfo */
module.exports = appInfo => {
  const config = exports = {}
  config.keys = `${appInfo.name}_1573021756112_3991`
  config.middleware = []

  config.toolbox = {
    appId: 'wxa3a1ed7e9913ca17',
    appSecret: '2747c603d324663f653b2da9f7d05258'
  }
  return config
}
