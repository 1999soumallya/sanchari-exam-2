const bcryptjs = require('bcryptjs');
const JsonWebToken = require('jsonwebtoken');

exports.encryptPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt)
}

exports.comparePassword = async (password, hash) => {
    return await bcryptjs.compare(password, hash)
}


exports.generateToken = (data) => {
    return new Promise((resolve, reject) => {
        tokenModel.create({ token: JsonWebToken.sign({ data }, process.env.TOKEN_SECRET), user: data }).then((result) => {
            resolve(result.token)
        }).catch((err) => {
            reject(err)
        });
    })
}

exports.decodeToken = (token) => {
    return JsonWebToken.decode(token)
}

exports.verifyToken = (token) => {
    return JsonWebToken.verify(token, process.env.TOKEN_SECRET)
}