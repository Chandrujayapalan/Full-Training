const mongoose = require('mongoose')

const Schema = mongoose.Schema

const requestSchema = new Schema({
    requestTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    accepted: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true })
const Request = mongoose.model('request', requestSchema)

module.exports = Request