require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');

const User = require('../models/user');

const {
  NotFoundError, UnauthorizedError, ConflictError, BadRequestError
} = require('../errors/errorsExport');

const validateUser = (res, user) => {
  if (!user) {
    throw new NotFoundError('Пользователь по указанному _id не найден.');
  }
  return res.send(user);
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name
  } = req.body;

  bcrypt.hash(password, 10).then((hashPassword) => {
    User.create({
      email, password: hashPassword, name
    })
      .then((user) => {
        res.status(201).send({
          name: user.name, email: user.email
        });
      })
      .catch((err) => {
        if (err.name instanceof Error.ValidatorError) {
          return next(new BadRequestError('Некорректные данные при создании пользователя'));
        }
        if (err.code === 11000) {
          return next(new ConflictError());
        }
        return next(err);
      });
  }).catch(next);
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => validateUser(res, user))
    .catch((err) => {
      if (err.name instanceof Error.ValidatorError) {
        return next(new BadRequestError('Некорректные данные при обновлении пользователя'));
      }
      if (err.code === 11000) {
        return next(new ConflictError());
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }

          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

          res.send({ token });
        });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  createUser, updateUser, login, getCurrentUser
};
