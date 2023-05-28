const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { errors } = require('celebrate');

const limiter = require('./utils/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const { NotFoundError } = require('./errors/errorsExport');
const router = require('./routes/index');

const app = express();

const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(requestLogger);
app.use(cors);

app.use(limiter);
app.use(router);

app.use((req, res, next) => next(new NotFoundError('Маршрут не найден')));

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT);
