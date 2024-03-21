const router = require('express').Router();

const { createProduct, updateProduct, getUserProduct, getProduct, deleteProduct, toggleProduct, getSingleProducts } = require('../controller/productController');
const { imageUpload } = require('../helper/fileUpload');
const { isAuthorized, validateRequest } = require('../middleware');
const { addProductValidation, updateProductValidation, commonProductValidation } = require('../validation/productValidation');

router.route('/add-product').post(isAuthorized, imageUpload, [addProductValidation, validateRequest], createProduct)
router.route('/update-product/:id').put(isAuthorized, imageUpload, [updateProductValidation, validateRequest], updateProduct)
router.route('/delete-product/:id').delete(isAuthorized, [commonProductValidation, validateRequest], deleteProduct)
router.route('/toggle-product/:id').patch(isAuthorized, [commonProductValidation, validateRequest], toggleProduct)

router.route('/get-user-products').get(isAuthorized, getUserProduct)
router.route('/get-products').get(getProduct)
router.route('/get-product/:id').get([commonProductValidation, validateRequest], getSingleProducts)


module.exports = router