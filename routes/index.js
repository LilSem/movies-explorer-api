const router = require('express').Router();

const userRouter = require('./user');
const moviesRouter = require('./movie');
const loginRouter = require('./login');
const auth = require('../middlewares/auth');

router.use(loginRouter);
router.use('/users', auth, userRouter);
router.use('/movies', auth, moviesRouter);

module.exports = router;
