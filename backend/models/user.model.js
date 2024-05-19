const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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
    },
    fileName: {
        type: String
    },
    fileUrl: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('users', userSchema)