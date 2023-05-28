const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (image) => isURL(image, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: 'Введен некорректный адрес постера фильма'
    }
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (trailerLink) => isURL(trailerLink, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: 'Введен некорректный адрес трейлера фильма'
    }
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (thumbnail) => isURL(thumbnail, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: 'Введен некорректный адрес миниатюры постера фильма'
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  movieId: {
    type: Number,
    required: true
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, {
  versionKey: false
});

module.exports = mongoose.model('movie', movieSchema);
