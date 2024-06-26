const multer = require("multer");

exports.imageUpload = multer({
    fileFilter: (req, file, cb) => {
        if (/image/.test(file.mimetype)) {
            cb(null, true);
        } else {
            req.imageValidationError = "This image type is not acceptable";
            return cb(req.fileValidationError, true);
        }
    }
}).single('image')

// function to upload file on cloudinary
const cloudinary = require('cloudinary').v2;

cloudinary.config({ cloud_name: process.env.CLOUD_NAME, api_key: process.env.API_KEY, api_secret: process.env.API_SECRET });

exports.uploadFile = (file, resource_type, filename) => {
    return new Promise(async (resolve, reject) => {
        try {
            const uploadResult_1 = await new Promise((resolve_1, reject_1) => {
                cloudinary.uploader.upload_stream({ overwrite: true, unique_filename: false, use_filename: false, folder: 'Images', resource_type, public_id: filename }, (error, uploadResult) => {
                    if (error) return reject_1(error);
                    return resolve_1(uploadResult);
                }).end(file);
            });
            resolve(uploadResult_1);
        } catch (error_1) {
            reject(error_1);
        }
    })
}