const mongoose = require('mongoose');

const productImageSchema = new mongoose.Schema({
    productImage: {
        type: String,
        required: true
    }
}, { timestamps: true })

productImageSchema.virtual('product', {
    ref: 'products',
    localField: '_id',
    foreignField: 'product_image'
})

module.exports = mongoose.model('productImages', productImageSchema);