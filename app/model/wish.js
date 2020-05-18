'use strict';
/** @param {Egg.Application} param0 */
module.exports = ({ mongoose }) => {

  const WishSchema = new mongoose.Schema({
    // 分类
    type: {
      type: String,
      required: true,
    },

    // 城市
    city: {
      type: String,
      required: true,
    },

    // 出生
    born: {
      type: String,
      required: true,
    },

    // 性别
    gender: {
      type: String,
      required: true,
    },

    // 星座
    conste: {
      type: String,
      required: true,
    },

    // 许愿人姓名
    name: {
      type: String,
      required: true,
    },

    // 许愿内容
    content: {
      type: String,
      required: true,
    },

    // 用户Id
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    // 点赞用户列表
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
  }, {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  });

  return mongoose.model('Wish', WishSchema, 'Wish');
};
