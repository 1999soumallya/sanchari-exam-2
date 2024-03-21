const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })

userSchema.virtual('products', {
    localField: '_id',
    foreignField: 'user',
    ref: 'products'
})

userSchema.set('toJSON', { virtual: true })
userSchema.set('toObject', { virtual: true })

module.exports = mongoose.model('users', userSchema);