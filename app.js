const express = require('express');
const helmet = require('helmet');

const { errors } = require('celebrate');

const connectionDB = require('./utils/connectionDB');
const limiter = require('./utils/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes/index');

const app = express();

const { PORT = 3001 } = process.env;

connectionDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(requestLogger);
app.use(cors);

app.use(limiter);
app.use(router);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT);
