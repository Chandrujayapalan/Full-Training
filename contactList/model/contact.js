const mongoose = require('mongoose')

const Schema = mongoose.Schema

const contactSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    contactId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
 },
    { timestamps: true })
const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact