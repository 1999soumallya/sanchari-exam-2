const { uniqueCheck, register, login, addUser, removeUser } = require('../controllers/auth.controller');
const { validateRequest } = require('../helpers/helpers');
const { isAuthorized, isSuperAdmin } = require('../middleware');
const { uniqueCheckValidation, registrationValidation, loginValidation, removeUserValidation } = require('../validations/auth.validation');

const Router = require('express').Router();

Router.route('/unique-check').get([uniqueCheckValidation, validateRequest], uniqueCheck)
Router.route('/registration').post([registrationValidation, validateRequest], register)
Router.route('/login').post([loginValidation, validateRequest], login)
Router.route('/add-user').post([isAuthorized, isSuperAdmin], [registrationValidation, validateRequest], addUser)
Router.route('/remove-user/:id').delete([isAuthorized, isSuperAdmin], [removeUserValidation, validateRequest], removeUser)

Router.route('/logout').get(isAuthorized, uniqueCheck)

module.exports = Router;