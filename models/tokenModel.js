const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps: true })

module.exports = mongoose.model('tokens', tokenSchema)