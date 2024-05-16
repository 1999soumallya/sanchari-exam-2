const { validationResult } = require("express-validator")
const messageHelper = require("./message.helper")

exports.validateRequest = (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json(messageHelper.validationError(validationResult(req).array()))
    }
    next()
}