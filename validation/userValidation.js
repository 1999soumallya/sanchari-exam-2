const { body } = require("express-validator");
const userModel = require("../models/userModel");

exports.registrationValidation = [
    body('name').notEmpty({ ignore_whitespace: true }).withMessage('Provide your name for create your account'),
    body('username').notEmpty({ ignore_whitespace: true }).withMessage('Provide your username for create your account').isEmail().withMessage('Provide valid username for create your account').custom(value => { 
        return userModel.findOne({ username: value }).then(result => {
            if (result) {
                return Promise.reject("Username already exists provide valid username for create your account");
            }
            return Promise.resolve(true);
        });
    }),
    body('email').notEmpty({ ignore_whitespace: true }).withMessage('Provide your email id for create your account').isEmail().withMessage('Provide valid email id for create your account').custom(value => {
        return userModel.findOne({ email: value }).then(result => {
            if (result) {
                return Promise.reject("Email Id already exists provide valid email id for create your account");
            }
            return Promise.resolve(true);
        });
    }),
    body('mobile').notEmpty({ ignore_whitespace: true }).withMessage('Provide your mobile number for create your account').isMobilePhone('en-IN').withMessage('Provide valid mobile number for create your account').custom(value => { 
        return userModel.findOne({ mobile: value }).then(result => {
            if (result) {
                return Promise.reject("Mobile Number already exists provide valid mobile number for create your account");
            }
            return Promise.resolve(true);
        });
    }),
    body('password').notEmpty({ ignore_whitespace: true }).withMessage('Provide your password for create your account').isLength({ min: 8 }).withMessage('Provide valid password for create your account').custom((value, { req }) => {
        if (value != req.body.confirmPassword) {
            return Promise.reject("Password must be same as confirm password");
        } else {
            return Promise.resolve(true);
        }
    }),
    body('confirmPassword').notEmpty({ ignore_whitespace: true }).withMessage('Provide your password for create your account').isLength({ min: 8 }).withMessage('Provide valid password for create your account').custom((value, { req }) => {
        if (value != req.body.password) {
            return Promise.reject("Confirm password must be same as password");
        } else {
            return Promise.resolve(true);
        }
    }),
]

exports.loginValidation = [
    body('mobile').notEmpty({ ignore_whitespace: true }).withMessage('Provide your mobile number for login').isMobilePhone('en-IN').withMessage('Provide valid mobile number for login your account'),
    body('password').notEmpty({ ignore_whitespace: true }).withMessage('Provide your password for login').isLength({ min: 8 }).withMessage('Provide valid password for login'),
]