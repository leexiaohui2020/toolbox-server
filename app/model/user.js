'use strict'
module.exports = ({ mongoose }) => {
  const UserSchema = new mongoose.Schema({
    openid: { type: String, index: true, unique: true, sparse: true },
    userInfo: {
      nickName: String,
      avatarUrl: String
    }
  }, {
    timestamps: {
      createdAt: 'createdTime',
      updatedAt: 'updatedTime'
    }
  })

  return mongoose.model('User', UserSchema, 'User')
}
