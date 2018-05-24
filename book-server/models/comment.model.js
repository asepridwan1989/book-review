const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  userId: [{
    type: Schema.Types.ObjectId,
    ref: "user"
  }],
  bookId: [{
    type: Schema.Types.ObjectId,
    ref: "book"
  }],
  liked: {
    type: Number,
    default: 25
  },
  content: {
    type: String,
    require: [true, 'content required']
  },
}, {
  timestamps: true
})

let comment = mongoose.model('Comment', commentSchema)

module.exports = comment
