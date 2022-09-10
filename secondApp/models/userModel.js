const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    dob: {
        type: Date
    },
    userType: {
        type: Number,
    },
    profilePic :{
        type : String
    }
},
{ timestamps: true })
const User = mongoose.model('User', userSchema)

module.exports = User