const router = require('express').Router();
const { celebrate } = require('celebrate');

const protectedDeleteMovie = require('../middlewares/deleteMovie');
const { removeMovieValidation, createMovieValidation } = require('../utils/validation');
const {
  getAllMovies,
  removeMovie,
  createMovie
} = require('../controllers/movie');

router.get('/', getAllMovies);
router.delete('/:_id', celebrate(removeMovieValidation), protectedDeleteMovie, removeMovie);
router.post('/', celebrate(createMovieValidation), createMovie);

module.exports = router;
