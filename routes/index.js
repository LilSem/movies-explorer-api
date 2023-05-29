const router = require('express').Router();

const userRouter = require('./user');
const moviesRouter = require('./movie');
const loginRouter = require('./login');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors/errorsExport');

router.use(loginRouter);
router.use('/users', auth, userRouter);
router.use('/movies', auth, moviesRouter);
router.use('/*', auth, (req, res, next) => next(new NotFoundError('Маршрут не найден')));

module.exports = router;
