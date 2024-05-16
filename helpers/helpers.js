const messageHelper = require("./message.helper")

exports.pagination = (limit = 10, page = 1, total = 10) => {
    return { limit, page, totalPage: Math.ceil(total / limit), totalDoc: total, skip: (page - 1) * limit }
}