const { query, oneOf, body, param } = require("express-validator");
const userModel = require("../models/user.model");

exports.uniqueCheckValidation = [
    oneOf([
        query('email').notEmpty().withMessage('Provide your email id for checking').isEmail().withMessage('Provide your valid email id for checking'),
        query('userName').notEmpty().withMessage('Provide your username for checking').isLowercase().withMessage('Provide your valid username for checking').isLength({ min: 5, max: 30 }).withMessage('Provide your valid username for checking').custom(value => !/\s/.test(value)).withMessage('No spaces are allowed in the username')
    ], { errorType: 'flat', message: 'Provide your valid email id or username for checking' })
]

exports.registrationValidation = [
    body('userName').notEmpty().withMessage('Provide your username for checking').isLowercase().withMessage('Provide your valid username for checking').isLength({ min: 5, max: 30 }).withMessage('Provide your valid username for checking').custom(value => !/\s/.test(value)).withMessage('No spaces are allowed in the username').custom(async(value) => {
        return await userModel.findOne({ userName: value }).then((result) => {
            if (result) {
                return Promise.reject('Username already exists');
            } else {
                return true;
            }
        })
    }),
    body('email').notEmpty().withMessage('Provide your email id for checking').isEmail().withMessage('Provide your valid email id for checking').custom(async (value) => {
        return await userModel.findOne({ email: value }).then((result) => {
            if (result) {
                return Promise.reject('Email id already exists');
            } else {
                return true;
            }
        })
    }),
    body('password').notEmpty().withMessage('Provide your password for checking').isLength({ min: 5, max: 30 }).withMessage('Provide your valid password for checking').custom(value =>!/\s/.test(value)).withMessage('No spaces are allowed in the password'),
]

exports.loginValidation = [
    body('email').notEmpty().withMessage('Provide your email id for checking').isEmail().withMessage('Provide your valid email id for checking'),
    body('password').notEmpty().withMessage('Provide your password for checking').isLength({ min: 5, max: 30 }).withMessage('Provide your valid password for checking').custom(value =>!/\s/.test(value)).withMessage('No spaces are allowed in the password'),
]

exports.removeUserValidation = [
    param('id').notEmpty().withMessage('Provide user id form removing this user').isMongoId().withMessage('Provide user id form removing this user')
]