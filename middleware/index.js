const { verifyToken } = require("../helpers/auth.helper")
const messageHelper = require("../helpers/message.helper")
const tokenMode = require("../models/token.mode")
const userModel = require("../models/user.model")

exports.isAuthorized = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

            let token = req.headers.authorization.split(" ")[1]

            await verifyToken(token).then(async () => {

                let tokenDetails = await tokenMode.findOne({ token: token })

                if (!tokenDetails) {
                    return res.status(401).json({ message: messageHelper.middleware.validToken, success: false })
                }

                req.tokenDetails = tokenDetails

                let userDetails = await userModel.findById(tokenDetails.user)

                if (!userDetails) {
                    return res.status(401).json({ message: messageHelper.middleware.unauthorized, success: false })
                }

                req.userDetails = userDetails

                next()

            }).catch((error) => {
                return res.status(401).json({ message: messageHelper.middleware.validToken, success: false })
            })

        } else {
            return res.status(401).json({ message: messageHelper.middleware.requireToken, success: false })
        }
    } catch (error) {
        res.status(500).json(messageHelper.commonError(error))
    }
}

exports.isSuperAdmin = (req, res, next) => {
    try {        
        if (req.userDetails.role == "super-admin") {
            next()
        } else {
            return res.status(401).json({ message: messageHelper.middleware.unauthorized, success: false })
        }
    } catch (error) {
        res.status(500).json(messageHelper.commonError(error))
    }
}