const { uniqueCheck, register, login, addUser, removeUser, getAllUser, logout, updateUser } = require('../controllers/auth.controller');
const { imageUpload } = require('../helpers/file.helper');
const { isAuthorized, isSuperAdmin, validateRequest } = require('../middleware');
const { uniqueCheckValidation, registrationValidation, loginValidation, removeUserValidation, addUserValidation } = require('../validations/auth.validation');

const Router = require('express').Router();

Router.route('/unique-check').get([uniqueCheckValidation, validateRequest], uniqueCheck)
Router.route('/registration').post([registrationValidation, validateRequest], register)
Router.route('/login').post([loginValidation, validateRequest], login)
Router.route('/add-user').post([isAuthorized, isSuperAdmin], [addUserValidation, validateRequest], addUser)
Router.route('/remove-user/:id').delete([isAuthorized, isSuperAdmin], [removeUserValidation, validateRequest], removeUser)
Router.route('/get-all-user').get([isAuthorized, isSuperAdmin], getAllUser)

Router.route('/update-user').post(isAuthorized, imageUpload, updateUser)

Router.route('/logout').get(isAuthorized, logout)

module.exports = Router;