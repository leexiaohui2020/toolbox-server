'use strict'
module.exports = ({ mongoose }) => {

  const BingPaperSchema = new mongoose.Schema({
    date: { type: String, index: true, unique: true, required: true },
    src: { type: String, requried: true }  
  })

  return mongoose.model('BingPaper', BingPaperSchema, 'BingPaper')
}
