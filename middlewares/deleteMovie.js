const Movie = require('../models/movie');
const { ForbiddenError, NotFoundError } = require('../errors/errorsExport');

module.exports = (req, res, next) => {
  const { _id } = req.params;

  Movie.findById(_id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найден.');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError();
      }
      return next();
    })
    .catch(next);
};
