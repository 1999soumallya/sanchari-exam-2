const { encryptPassword, comparePassword, generateToken } = require("../helpers/auth.helper")
const messageHelper = require("../helpers/message.helper")
const tokenMode = require("../models/token.mode")
const userModel = require("../models/user.model")

exports.uniqueCheck = (req, res) => {
    try {
        const { email, userName } = req.query

        if (userName) {
            userModel.findOne({ userName: { $regex: userName, $options: "si" } }).then((result) => {
                if (result) {
                    return res.status(200).json({ message: messageHelper.userCheck.success })
                }
                return res.status(200).json({ message: messageHelper.userCheck.notfound })
            }).catch((error) => {
                res.status(500).json({ message: messageHelper.userCheck.failed, error: error.stack })
            })
        } else {
            userModel.findOne({ email: { $regex: email, $options: "si" } }).then((result) => {
                if (result) {
                    return res.status(200).json({ message: messageHelper.userCheck.success })
                }
                return res.status(200).json({ message: messageHelper.userCheck.notfound })
            }).catch((error) => {
                res.status(500).json({ message: messageHelper.userCheck.failed, error: error.stack })
            })
        }

    } catch (error) {
        res.status(500).json(messageHelper.commonError(error))
    }
}

exports.register = async (req, res) => {
    try {
        const { userName, email, password } = req.body

        userModel.create({ userName, email, password: await encryptPassword(password) }).then(() => {
            res.status(200).json({ message: messageHelper.register.success })
        }).catch((error) => {
            res.status(500).json({ message: messageHelper.register.failed, error: error.stack })
        })
    } catch (error) {
        res.status(500).json(messageHelper.commonError(error))
    }
}

exports.login = (req, res) => {
    try {
        const { email, password } = req.body

        userModel.findOne({ email }).then(async (result) => {
            if (result) {
                if (await comparePassword(password, result.password)) {
                    res.status(200).json({ message: messageHelper.login.success, data: result, token: await generateToken(result._id) })
                } else {
                    res.status(200).json({ message: messageHelper.login.wrong })
                }
            } else {
                res.status(200).json({ message: messageHelper.login.noUser })
            }
        }).catch((error) => {
            res.status(500).json({ message: messageHelper.login.failed, error: error.stack })
        })
    } catch (error) {
        res.status(500).json(messageHelper.commonError(error))
    }
}

exports.addUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body

        userModel.create({ userName, email, password: await encryptPassword(password) }).then((result) => {
            res.status(200).json({ message: messageHelper.addUser.success, data: result })
        }).catch((error) => {
            res.status(500).json({ message: messageHelper.addUser.failed, error: error.stack })
        })
    } catch (error) {
        res.status(500).json(messageHelper.commonError(error))
    }
}

exports.removeUser = (req, res) => {
    try {
        const { id } = req.params

        userModel.findOneAndDelete({ _id: id }, { new: true }).then((result) => {
            if (!result) {
                return res.status(404).json({ message: messageHelper.removeUser.notfound })
            }
            res.status(200).json({ message: messageHelper.removeUser.success, data: result })
        }).catch((error) => {
            res.status(500).json({ message: messageHelper.removeUser.failed, error: error.stack })
        })
    } catch (error) {
        res.status(500).json(messageHelper.commonError(error))
    }
}

exports.logout = (req, res) => { 
    try {
        const { tokenDetails } = req

        tokenMode.findOneAndDelete({ token: tokenDetails.token }).then((details) => {
            if (!details) {
                return res.status(401).json({ message: messageHelper.middleware.unauthorized })
            }
            res.status(200).json({ message: messageHelper.logout.success })
        }).catch((error) => {
            res.status(500).json({ message: messageHelper.logout.failed, error: error.stack })
        })

        res.status(200).json({ message: messageHelper.logout.success })
    } catch (error) {
        res.status(500).json(messageHelper.commonError(error))
    }
}