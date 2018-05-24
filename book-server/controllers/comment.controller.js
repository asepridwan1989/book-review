const jwt = require('jsonwebtoken')
const Comment = require('../models/comment.model')
const mongoose = require('mongoose')

module.exports = {
  addComment: (req, res)=>{
      console.log(req.body)
      const token = req.headers.token
      let verified = jwt.decode(token,process.env.TOKENKEY)
      const userId = verified.id
      const bookId = req.body.bookId
      const content = req.body.content
      let newComment = new Comment({
          userId,
          bookId,
          content
      })
      newComment.save()
        .then(result=>{
          console.log(result)
            res.status(201).json({
                message: 'successfuly add new article',
                data: result
            })
        })
        .catch(error=>{
            res.status(400).json({
                message: 'failed to add new task'
            })
        })
  }
}
