const jwt = require('jsonwebtoken')
const Book = require('../models/book.model')
const mongoose = require('mongoose')

module.exports = {
    getListSelf: (req, res)=>{
      const id = mongoose.Types.ObjectId(req.params.id)
      Book.find()
      .populate('userId', 'username')
      .then((book) => {
      res.status(201).json({
          message: 'successfuly add new item',
          data: book
        })
      })
      .catch(error=>{
        res.status(400).json({
          message: 'failed to add new item'
        })
      })
    },

    addBook: (req, res)=>{
        const token = req.headers.token
        let verified = jwt.decode(token,process.env.TOKENKEY)
        const userId = verified.id
        let bookObj = {
            userId: userId,
            judul: req.body.judul,
            imageUrl: req.file.cloudStoragePublicUrl,
            penerbit: req.body.penerbit,
            penulis: req.body.penulis
        }
        let newBook = new Book (bookObj)
        newBook.save()
            .then(result=>{
              res.status(201).json({
                message: 'successfuly add new item',
                data: result
              })
            })
            .catch(error=>{
              res.status(400).json({
                message: 'failed to add new item'
              })
            })
    },

    deleteBook: (req, res) => {
      const id = mongoose.Types.ObjectId(req.params.id)
      const token = req.headers.token
      let verified = jwt.decode(token,process.env.TOKENKEY)
      const userId = verified.id

      Book.findById(id, (err, book) => {
          if(err) {
              res.status(400).send({
                  message: 'book not found'
              })
          } else {
              if(Book.userId == userId) {
                  Book.remove({
                      _id: id
                  }, (err) => {
                      if(err) {
                          res.status(400).send({
                              message: 'failed to delete Book'
                          })
                      } else {
                          res.status(200).send({
                              message: 'Book was successfuly deleted',
                              data: Book
                          })
                      }
                  })
              } else {
                  res.status(400).send({
                      message: 'Invalid user'
                  })
              }
          }
      })
    },

    searchBook: (req, res)=>{
        const titleQuery = req.query.title
        console.log(req.query.title)
        Book.find({
            title: {
                $regex: '.*' + titleQuery + '.*'
            }
        },(err,Book)=>{
            if(err){
                res.status(400).send({
                    message: 'failed to get task'
                })
            }else {
                if(Book.length > 0){
                    res.status(200).send({
                        message: 'Book was succesfuly got',
                        data: Book
                    })
                }else{
                    res.status(200).send({
                        message: 'nothing to show'
                    })
                }
            }
        })
    },
    getListAll: (req, res)=>{
        Book.find()
        .populate('userId', 'username')
        .then(book=>{
          console.log(book)
          if(book.length > 0){
              res.status(200).json({
                  message: 'successfuly got data',
                  data: book
              })
          }else{
                res.status(200).json({
                message: 'you dont have any Book'
            })
          }
        })
        .catch(err=>{
            console.log('error', err)
            res.status(403).json({
                message: 'invalid user'
            })
        })
    },

}
