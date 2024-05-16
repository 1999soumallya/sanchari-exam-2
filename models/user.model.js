const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['super-admin', 'admin', 'user', 'manager'],
        default: 'user'
    }
}, { timestamps: true })

module.exports = mongoose.model('users', userSchema)