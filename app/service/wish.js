/**
 * ==============================
 *          许愿树Service
 * ==============================
 */
'use strict';
const moment = require('moment');
const Service = require('egg').Service;

class WishService extends Service {

  /**
   * 用户发布愿望
   * @param {Object} opts
   * @param {String} opts.userId - 用户ID
   * @param {String} opts.type - 设置分类
   * @param {String} opts.city - 设置城市
   * @param {String} opts.born - 设置出生
   * @param {String} opts.gender - 设置性别
   * @param {String} opts.conste - 设置星座
   * @param {String} opts.name - 许愿人姓名
   * @param {String} opts.content - 许愿内容
   */
  async push(opts = {}) {
    const { ctx } = this;
    const wish = await ctx.model.Wish.create(opts);
    ctx.logger.info('新增许愿：%j', wish);
  }

  /**
   * 获取许愿列表
   * @param {Object} opts
   * @param {Number} opts.page - 页码
   * @param {Number} opts.pagesize - 查询数量
   * @param {String} opts.keyword - 关键词
   */
  async list(opts = {}) {
    const { ctx } = this;
    const { page, pagesize, keyword } = opts;
    const query = {}
    if (keyword) query.content = RegExp(keyword)
    const data = await ctx.model.Wish.find(query)
      .populate('userId')
      .skip((page - 1) * pagesize)
      .limit(pagesize)
      .sort({ createdAt: -1 });
    const total = await ctx.model.Wish.countDocuments(query)
    const list = data.map(item => {
      const wish = item.toObject();
      wish.createdAt = moment(wish.createdAt).format('YYYY-MM-DD HH:mm:ss');
      wish.updatedAt = moment(wish.updatedAt).format('YYYY-MM-DD HH:mm:ss');
      return wish;
    });
    return { page, pagesize, total, list };
  }

  /**
   * 祝福/取消祝福
   * @param {Object} opts
   * @param {String} opts.wishId
   * @param {String} opts.userId
   */
  async like(opts = {}) {
    const { ctx } = this;
    const wish = await ctx.model.Wish.findOne({ _id: opts.wishId });
    const user = await ctx.model.User.findOne({ _id: opts.userId });

    if (!wish) return new Error('愿望不存在');
    if (!user) return new Error('用户不存在');
    const likes = wish.likes.map(v => v.toString());
    
    if (likes.includes(opts.userId)) return new Error('您已经送过祝福啦，感谢您的祝福')

    likes.push(opts.userId);
    await wish.updateOne({
      $set: { likes },
    });
  }
}

module.exports = WishService;
