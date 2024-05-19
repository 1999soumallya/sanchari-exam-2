const { encryptPassword, comparePassword, generateToken } = require("../helpers/auth.helper")
const { uploadFile } = require("../helpers/file.helper")
const { pagination } = require("../helpers/helpers")
const messageHelper = require("../helpers/message.helper")
const tokenMode = require("../models/token.mode")
const userModel = require("../models/user.model")
const UUID = require('uuid')

exports.uniqueCheck = (req, res) => {
    try {
        const { email, userName } = req.query

        if (userName) {
            userModel.findOne({ userName }).then((result) => {
                if (result) {
                    return res.status(200).json({ message: messageHelper.userCheck.success, success: true })
                }
                return res.status(200).json({ message: messageHelper.userCheck.notfound, success: true })
            }).catch((error) => {
                res.status(500).json({ message: messageHelper.userCheck.failed, success: false, error: error.stack })
            })
        } else {
            userModel.findOne({ email: { $regex: email, $options: "si" } }).then((result) => {
                if (result) {
                    return res.status(200).json({ message: messageHelper.userCheck.success, success: true })
                }
                return res.status(200).json({ message: messageHelper.userCheck.notfound, success: true })
            }).catch((error) => {
                res.status(500).json({ message: messageHelper.userCheck.failed, success: false, error: error.stack })
            })
        }

    } catch (error) {
        res.status(500).json(messageHelper.commonError(error))
    }
}

exports.register = async (req, res) => {
    try {
        const { userName, email, password } = req.body

        userModel.create({ userName, email, password: await encryptPassword(password) }).then(async (result) => {
            res.status(200).json({ message: messageHelper.register.success, success: true, data: result, token: await generateToken(result._id) })
        }).catch((error) => {
            res.status(500).json({ message: messageHelper.register.failed, success: false, error: error.stack })
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
                    res.status(200).json({ message: messageHelper.login.success, success: true, data: result, token: await generateToken(result._id) })
                } else {
                    res.status(200).json({ message: messageHelper.login.wrong, success: false })
                }
            } else {
                res.status(200).json({ message: messageHelper.login.noUser, success: false })
            }
        }).catch((error) => {
            res.status(500).json({ message: messageHelper.login.failed, error: error.stack, success: false })
        })
    } catch (error) {
        res.status(500).json(messageHelper.commonError(error))
    }
}

exports.addUser = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body

        userModel.create({ userName, email, password: await encryptPassword(password), role }).then((result) => {
            res.status(200).json({ message: messageHelper.addUser.success, data: result, success: true })
        }).catch((error) => {
            res.status(500).json({ message: messageHelper.addUser.failed, error: error.stack, success: false })
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
                return res.status(404).json({ message: messageHelper.removeUser.notfound, success: false })
            }
            res.status(200).json({ message: messageHelper.removeUser.success, data: result, success: true })
        }).catch((error) => {
            res.status(500).json({ message: messageHelper.removeUser.failed, error: error.stack, success: false })
        })
    } catch (error) {
        res.status(500).json(messageHelper.commonError(error))
    }
}

exports.getAllUser = async (req, res) => {
    try {

        const paginationObject = pagination(req.query.limit || 10, req.query.page || 1, await userModel.countDocuments({ role: { $ne: 'super-admin' } }))

        userModel.find({ role: { $ne: 'super-admin' } }).skip(paginationObject.skip).limit(paginationObject.limit).then((result) => {
            res.status(200).json({ message: messageHelper.getAllUser.success, data: result, pagination: paginationObject, success: true })
        }).catch((error) => {
            res.status(500).json({ message: messageHelper.getAllUser.failed, error: error.stack, success: false })
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
                return res.status(401).json({ message: messageHelper.middleware.unauthorized, success: false })
            }
            res.status(200).json({ message: messageHelper.logout.success, success: true })
        }).catch((error) => {
            res.status(500).json({ message: messageHelper.logout.failed, error: error.stack, success: false })
        })

    } catch (error) {
        res.status(500).json(messageHelper.commonError(error))
    }
}

exports.updateUser = async (req, res) => { 
    try {
        const { userDetails } = req
        let fileName, fileUrl

        if (req.file) {
            fileName = UUID.v4()
            fileUrl = await (await uploadFile(req.file.buffer, 'image', fileName)).url
        }

        userModel.findOneAndUpdate({ _id: userDetails.id }, { fileName, fileUrl }, { new: true }).then((result) => {
            if (!result) {
                return res.status(404).json({ message: messageHelper.updateUser.notfound, success: false })
            }
            res.status(200).json({ message: messageHelper.updateUser.success, data: result, success: true })
        }).catch((error) => {
            res.status(500).json({ message: messageHelper.updateUser.failed, error: error.stack, success: false })
        })
    } catch (error) {
        res.status(500).json(messageHelper.commonError(error))
    }
}