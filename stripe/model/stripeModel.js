const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stripeSchema = new Schema({
    custumerId: {
        type: String,
      
    },
    userId: {
        type: String,
        ref :  "User"
      
    }
},
{ timestamps: true })
const stripeModel = mongoose.model('stripeId', stripeSchema)

module.exports = stripeModel