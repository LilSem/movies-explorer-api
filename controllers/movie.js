const { Error } = require('mongoose');

const Movie = require('../models/movie');
const { BadRequestError, NotFoundError } = require('../errors/errorsExport');

const getAllMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name instanceof Error.ValidatorError) {
        return next(new BadRequestError('Некорректные данные при создании фильма'));
      }
      return next(err);
    });
};

const removeMovie = (req, res, next) => {
  const { _id } = req.params;

  Movie.findByIdAndDelete(_id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найден.');
      }
      return res.send({ message: 'Удаление прошло успешно' });
    })
    .catch((err) => {
      if (err.name instanceof Error.CastError) {
        return next(new BadRequestError('Неверный _id'));
      }
      return next(err);
    });
};

module.exports = {
  getAllMovies,
  createMovie,
  removeMovie,
};
