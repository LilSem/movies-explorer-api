const { Joi } = require('celebrate');
const { regexUrl } = require('./regex');

const signInValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
};

const signUpValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  })
};

const updateUserValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email()
  })
};

const removeMovieValidation = {
  params: Joi.object({
    _id: Joi.string().hex().length(24).required()
  })
};

const createMovieValidation = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    year: Joi.string().required(),
    duration: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regexUrl),
    trailerLink: Joi.string().required().regex(regexUrl),
    thumbnail: Joi.string().required().regex(regexUrl),
    movieId: Joi.number().required().unsafe(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  })
};

module.exports = {
  signInValidation,
  signUpValidation,
  updateUserValidation,
  removeMovieValidation,
  createMovieValidation
};
