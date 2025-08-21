const express = require('express');
const upload = require('../Utils/upload');
const { createMovie, getMovies, getMovie, updateMovie, deleteMovie } = require('../Controllers/movieController');
const router = express.Router();
require('../db')

router.post('/movies', upload.single('image'), createMovie);
router.get('/movies', getMovies);
router.get('/movies/:id', getMovie);
router.put('/movies/:id', upload.single('image'), updateMovie);
router.delete('/movies/:id', deleteMovie);

module.exports = router;