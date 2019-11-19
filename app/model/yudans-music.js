'use strict'
module.exports = ({ mongoose }) => {
  const YudansMusicSchema = new mongoose.Schema({
    no: { type: Number, index: true, unique: true, required: true },
    type: { type: String },
    title: { type: String },
    author: { type: String }
  }, {
    timestamps: {
      created_at: 'createdTime',
      updated_at: 'updatedTime'
    }
  })

  return mongoose.model('YudansMusic', YudansMusicSchema, 'YudansMusic')
}
