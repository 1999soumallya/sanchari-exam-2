const { validationResult: validation } = require('express-validator');
const tokenModel = require('../models/tokenModel');

exports.validateRequest = async (req, res, next) => {
    try {
        if (validation(req).isEmpty()) {
            return next();
        }
        return res.status(403).json({ message: 'Please fill all mandatory fields', success: false, errors: validation(req).array() });
    } catch (error) {
        next(error);
    }
}

exports.isAuthorized = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            let token = req.headers.authorization.split(' ')[1]

            if (!await verifyToken(token)) {
                return res.status(401).json({ message: "Please provide valid authentication token", success: false })
            }

            let userId = decodeToken(token).data
            let tokenDetails = await tokenModel.findOne({ token: token, user: userId }).populate("user")

            if (!tokenDetails) {
                return res.status(401).json({ message: "Please provide valid authentication token", success: false })
            }

            req.token = token
            req.tokenDetails = tokenDetails

            if (!tokenDetails.user) {
                return res.status(401).json({ message: "User find failed", success: false })
            }

            req.userDetails = tokenDetails.user
            next()

        } else {
            return res.status(401).json({ message: "Please provide your authentication token", success: false })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error! please try again after some time", success: false, error: error.stack })
    }
}