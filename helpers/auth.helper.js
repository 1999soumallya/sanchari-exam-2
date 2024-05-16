const bcryptjs = require('bcryptjs');
const tokenMode = require("../models/token.mode")

exports.encryptPassword = async (password) => {
    let salt = bcryptjs.genSaltSync(10)
    return bcryptjs.hashSync(password, salt)
}

exports.comparePassword = async (password, hashPassword) => {
    return bcryptjs.compareSync(password, hashPassword)
}

exports.generateToken = async (id) => {
    return new Promise(function (resolve, reject) {
        tokenMode.create({ user: id, token: jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '15d' }) }).then((result) => {
            resolve(result.token)
        }).catch((error) => {
            reject(error)
        })
    })
}

exports.verifyToken = async (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET, { complete: true })
}

exports.decodeToken = (token) => {
    return jwt.decode(token, { complete: true })
}