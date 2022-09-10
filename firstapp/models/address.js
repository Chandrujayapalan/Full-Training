const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addresschema = new Schema
({
    // userid:{
    // userid :String
    //         },
    userId :{
    type: mongoose.Schema.Types.ObjectId,
    ref : "user"
    
    },
    address :{
    city : String,
    country : String,
    address : String
             }

},
{timestamps : true})

const addressMake = mongoose.model('addressMake', addresschema)

module.exports = addressMake