const productModel = require("../models/productModel")

exports.createProduct = async (req, res) => {
    try {
        const { userDetails } = req
        const { product_name, quantity, color, product_price, product_image, discount, } = req.body

        productModel.create({ product_name, quantity, color, product_price, product_image, discount, user: userDetails._id }).then((product) => {
            res.status(200).json({ message: "Product created successfully", success: true, product: product })
        }).catch((error) => {
            res.status(400).json({ message: "Product creation process failed", success: false, error: error.stack })
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error! please try again after some time", success: false, error: error.stack })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { userDetails } = req
        const { id } = req.params
        const { product_name, quantity, color, product_price, product_image, discount, } = req.body

        productModel.findOneAndUpdate({ _id: id, user: userDetails._id, isDeleted: false }, { product_name, quantity, color, product_price, product_image, discount }, { new: true }).then((product) => {
            if (!product) {
                return res.status(400).json({ message: "Product not found provide valid product id", success: false })
            }

            res.status(200).json({ message: "Product updated successfully", success: true, product: product })
        }).catch((error) => {
            res.status(400).json({ message: "Product update process failed", success: false, error: error.stack })
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error! please try again after some time", success: false, error: error.stack })
    }
}