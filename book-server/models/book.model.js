const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
  userId: [{
    type: Schema.Types.ObjectId,
    ref: "user"
  }],
  judul: {
    type: String,
    require: [true, 'title required']
  },
  liked: {
    type: Number,
    default: 0
  },
  penerbit: {
    type: String,
    require: [true, 'content required']
  },
  penulis: {
    type: String,
    require: [true, 'content required']
  },
  imageUrl: String
}, {
  timestamps: true
})

let book = mongoose.model('Book', bookSchema)

module.exports = book
