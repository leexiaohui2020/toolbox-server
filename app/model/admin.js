'use strict';
const md5 = require('md5');

/** @param {Egg.Application} param0 */
module.exports = ({ mongoose }) => {
  const AdminSchema = new mongoose.Schema({
    // 用户名
    username: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },

    // 密码
    password: {
      type: String,
      required: true,
      set: md5,
    },

    // 绑定用户
    user: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      sparse: false,
    },

    // token
    token: String,
  }, {
    autoIndex: false,
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  });

  AdminSchema.method({

    // 创建Token
    async createToken() {
      const token = md5(JSON.stringify(Object.assign(this.toObject(), {
        loginTime: new Date(),
      })));
      await this.updateOne({ $set: { token } });
      return token;
    },

    // 验证密码
    authPass(password) {
      return this.password === md5(password);
    },
  });

  return mongoose.model('Admin', AdminSchema, 'Admin');
};
