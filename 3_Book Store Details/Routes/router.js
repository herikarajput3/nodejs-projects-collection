const { createBook, getBooks, getBookById, updateBook, deleteBook } = require('../Controllers/bookController');

const router = require('express').Router();
require('../db')

router.post('/createBook', createBook);
router.get('/getAllBooks', getBooks);
router.get('/getBook/:id', getBookById);
router.put('/updateBook/:id', updateBook);
router.delete('/deleteBook/:id', deleteBook);

module.exports = router;