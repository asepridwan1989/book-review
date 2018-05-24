var express = require('express')
var router = express.Router()
const {addComment} = require('../controllers/comment.controller')
const {auth} = require('../middleware/auth')

router.post('/', auth, addComment)

module.exports = router
