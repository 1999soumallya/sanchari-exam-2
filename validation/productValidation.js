const { body, param } = require("express-validator");

exports.addProductValidation = [
    body('product_name').notEmpty({ ignore_whitespace: true }).withMessage('Provide your product name for creating a new product'),
    body('color').notEmpty({ ignore_whitespace: true }).withMessage('Provide your product color for creating a new product'),
    body('product_price').notEmpty({ ignore_whitespace: true }).withMessage('Provide your product price for creating a new product').isNumeric().withMessage('This field is only accept numeric value'),
    body('quantity').notEmpty({ ignore_whitespace: true }).withMessage('Provide your product quantity for creating a new product').isNumeric().withMessage('This field is only accept numeric value'),
    body('discount').notEmpty({ ignore_whitespace: true }).withMessage('Provide your product discount for creating a new product').isNumeric().withMessage('This field is only accept numeric value'),
    body('isActive').notEmpty({ ignore_whitespace: true }).withMessage('Provide your product status for creating a new product').isBoolean().withMessage('This field is only accept the boolean value'),
]

exports.updateProductValidation = [
    param('id').notEmpty({ ignore_whitespace: true }).withMessage('Provide your product id for updating your product').isMongoId().withMessage('This field is only accept product id for updating your product'),
    body('product_name').notEmpty({ ignore_whitespace: true }).withMessage('Provide your product name for creating a new product'),
    body('color').notEmpty({ ignore_whitespace: true }).withMessage('Provide your product color for creating a new product'),
    body('product_price').notEmpty({ ignore_whitespace: true }).withMessage('Provide your product price for creating a new product').isNumeric().withMessage('This field is only accept numeric value'),
    body('quantity').notEmpty({ ignore_whitespace: true }).withMessage('Provide your product quantity for creating a new product').isNumeric().withMessage('This field is only accept numeric value'),
    body('discount').notEmpty({ ignore_whitespace: true }).withMessage('Provide your product discount for creating a new product').isNumeric().withMessage('This field is only accept numeric value'),
    body('isActive').notEmpty({ ignore_whitespace: true }).withMessage('Provide your product status for creating a new product').isBoolean().withMessage('This field is only accept the boolean value'),
]

exports.commonProductValidation = [
    param('id').notEmpty({ ignore_whitespace: true }).withMessage('Provide your product id for deleting your product').isMongoId().withMessage('This field is only accept product id for deleting your product'),
]