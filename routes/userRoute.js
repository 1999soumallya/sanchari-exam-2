const router = require('express').Router();

const { registration, login } = require('../controller/userController');
const { validateRequest } = require('../middleware');
const { registrationValidation, loginValidation } = require('../validation/userValidation');

router.route('/registration').post([registrationValidation, validateRequest], registration)
router.route('/login').post([loginValidation, validateRequest], login)

module.exports = router;