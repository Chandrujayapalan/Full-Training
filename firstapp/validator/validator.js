const joi = require('joi')
const { joiPassword } = require('joi-password')
// const updatemethod = joi.object().keys({
//     name:joi.string().required(),
//     gender : joi.string().valid('m','f','o').optional(),
//     bloodGroup :joi.string().optional(),
//     DoB : joi.date().optional()
// })

const registermethod  = joi.object({
    name : joi.string().max(100).required(),
    gender : joi.string().valid('m','f','o').optional(),
    bloodGroup :joi.string().optional(),
    DoB : joi.date().optional(),
    email:joi.string().email().required(),
    password: joiPassword.string().minOfSpecialCharacters(1).min(8).minOfUppercase(1).minOfNumeric(1).noWhiteSpaces().required(),
    phone :joi.string().required(),
    address : joi.string().optional()
})
module.exports = registermethod