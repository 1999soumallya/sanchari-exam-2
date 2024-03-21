const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    product_image: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('products', productSchema);