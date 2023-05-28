const router = require('express').Router();
const { celebrate } = require('celebrate');

const { updateUserValidation } = require('../utils/validation');
const {
  updateUser,
  getCurrentUser
} = require('../controllers/user');

router.get('/me', getCurrentUser);
router.patch('/me', celebrate(updateUserValidation), updateUser);

module.exports = router;
