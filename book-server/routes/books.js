const express = require('express');
const router = express.Router();
const images = require('../helper/images')
const { addBook, getListAll, searchBook, deleteBook,getListSelf } = require('../controllers/book.controller')
const { auth } = require('../middleware/auth')

router
  .post('/',
    auth,
    images.multer.single('image'),
    images.sendUploadToGCS,
    addBook
  )
  .get('/:id', getListSelf)
  .get('/', getListAll)
  .get('/search', searchBook)
  .delete('/:id', auth, deleteBook)


module.exports = router;
