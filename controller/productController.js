const { pagination, uploadFile } = require("../helper/helper")
const productImageModel = require("../models/productImageModel")
const productModel = require("../models/productModel")
const UUID = require('uuid')

exports.createProduct = async (req, res) => {
    try {
        const { userDetails } = req
        const { product_name, quantity, color, product_price, discount, isActive } = req.body
        let product_image = [], productImage

        if (req.files) {
            productImage = await req.files.map(async file => {
                await uploadFile(file.buffer, 'image', UUID.v4()).then(async (result) => {
                    await productImageModel.create({ productImage: result.url }).then((details) => {
                        product_image.push(details._id)
                    })
                })
            })

        }

        await Promise.all(productImage).then(() => {
            productModel.create({ product_name, quantity, color, product_price, product_image, discount, user: userDetails._id, isActive }).then((product) => {
                return res.status(200).json({ message: "Product created successfully", success: true, product: product })
            }).catch((error) => {
                return res.status(400).json({ message: "Product creation process failed", success: false, error: error.stack })
            })
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error! please try again after some time", success: false, error: error.stack })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { userDetails } = req
        const { id } = req.params
        const { product_name, quantity, color, product_price, discount } = req.body
        let product_image = [], productImage

        if (req.files) {
            productImage = await req.files.map(async file => {
                await uploadFile(file.buffer, 'image', UUID.v4()).then(async (result) => {
                    await productImageModel.create({ productImage: result.url }).then((details) => {
                        product_image.push(details._id)
                    })
                })
            })
        }

        await Promise.all(productImage).then(() => {
            productModel.findOneAndUpdate({ _id: id, user: userDetails._id, isDeleted: false }, { product_name, quantity, color, product_price, $push: { product_image }, discount }, { new: true }).then((product) => {
                if (!product) {
                    return res.status(400).json({ message: "Product not found provide valid product id", success: false })
                }

                res.status(200).json({ message: "Product updated successfully", success: true, product: product })
            }).catch((error) => {
                res.status(400).json({ message: "Product update process failed", success: false, error: error.stack })
            })
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error! please try again after some time", success: false, error: error.stack })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { userDetails } = req
        const { id } = req.params

        productModel.findOneAndUpdate({ _id: id, user: userDetails._id, isDeleted: false }, { isDeleted: true }, { new: true }).then((product) => {
            if (!product) {
                return res.status(400).json({ message: "Product not found provide valid product id", success: false })
            }

            res.status(200).json({ message: "Product deleted successfully", success: true, product: product })

        }).catch((error) => {
            res.status(400).json({ message: "Product delete process failed", success: false, error: error.stack })
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error! please try again after some time", success: false, error: error.stack })
    }
}

exports.toggleProduct = async (req, res) => {
    try {
        const { userDetails } = req
        const { id } = req.params

        const productDetails = await productModel.findOne({ _id: id, user: userDetails._id, isDeleted: false })

        if (!productDetails) {
            return res.status(400).json({ message: "Product not found provide valid product id", success: false })
        }

        productModel.findOneAndUpdate({ _id: id, user: userDetails._id, isDeleted: false }, { isActive: !productDetails.isActive }, { new: true }).then((product) => {
            res.status(200).json({ message: product.isActive ? "Product successfully activated" : "Product successfully deactivated", success: true, product: product })
        }).catch((error) => {
            res.status(400).json({ message: "Product toggle process failed", success: false, error: error.stack })
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error! please try again after some time", success: false, error: error.stack })
    }
}

exports.getUserProduct = async (req, res) => {
    try {
        const { userDetails } = req

        const paginationObject = pagination(req.query.limit || 10, req.query.page || 1, await productModel.countDocuments({ user: userDetails._id, isDeleted: false }))

        productModel.find({ user: userDetails._id, isDeleted: false }).populate("product_image").then((products) => {
            res.status(200).json({ message: "Products fetched successfully", success: true, products: products, pagination: paginationObject })
        }).catch((error) => {
            res.status(400).json({ message: "Products fetch process failed", success: false, error: error.stack })
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error! please try again after some time", success: false, error: error.stack })
    }
}

exports.getProduct = async (req, res) => {
    try {

        const paginationObject = pagination(req.query.limit || 10, req.query.page || 1, await productModel.countDocuments({ isDeleted: false, isActive: true }))

        productModel.find({ isDeleted: false, isActive: true }).populate([{ path: 'user', select: 'name' }, { path: 'product_image' }]).then((products) => {
            res.status(200).json({ message: "Products fetched successfully", success: true, products: products, pagination: paginationObject })
        }).catch((error) => {
            res.status(400).json({ message: "Products fetch process failed", success: false, error: error.stack })
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error! please try again after some time", success: false, error: error.stack })
    }
}

exports.getSingleProducts = async (req, res) => {
    try {
        const { id } = req.params

        productModel.findOne({ _id: id, isDeleted: false }).populate([{ path: 'user', select: 'name' }, { path: 'product_image' }]).then((product) => {
            if (!product) {
                return res.status(400).json({ message: "Product not found provide valid product id", success: false })
            }
            res.status(200).json({ message: "Product fetched successfully", success: true, product: product })
        }).catch((error) => {
            res.status(400).json({ message: "Product fetch process failed", success: false, error: error.stack })
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error! please try again after some time", success: false, error: error.stack })
    }
}