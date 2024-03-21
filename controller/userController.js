const userModel = require("../models/userModel");
const { encryptPassword, comparePassword, generateToken } = require("../helper/userHelper");

exports.registration = async (req, res) => {
    try {
        const { name, email, mobile, username, password } = req.body

        userModel.create({ name, email, mobile, username, password: await encryptPassword(password) }).then(() => {
            res.status(200).json({ message: 'User is successfully registered', success: true })
        }).catch(err => {
            res.status(400).json({ message: 'User registration process failed', error: err.stack, success: false })
        })

    } catch (error) {
        res.status(500).json({ message: 'Internal server error! please try again after sometime', success: false, error: error.stack });
    }
}

exports.login = async (req, res) => {
    try {
        const { mobile, password } = req.body

        const userDetails = await userModel.findOne({ mobile })

        if (!userDetails) {
            return res.status(400).json({ message: 'Invalid username or password', success: false })
        }

        const isMatch = await comparePassword(password, userDetails.password)

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password', success: false })
        }

        res.status(200).json({ message: 'User is successfully login', success: true, token: await generateToken(userDetails._id) })

    } catch (error) {
        res.status(500).json({ message: 'Internal server error! please try again after sometime', success: false, error: error.stack });
    }
}