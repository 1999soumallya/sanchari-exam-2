const { default: mongoose } = require("mongoose");

const token = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    token: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("tokens", token)