
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const subjectSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    English: {
        type: Number,
        required: true
    },
    Tamil: {
        type: Number,
        required: true
    },
    Maths: {
        type: Number,
        required: true
    },
    Science: {
        type: Number,
        required: true
    },
    Social: {
        type: Number,
        required: true
    },
    Total: {
        type: Number,
        
    },
    Rank:{
        type:Number
    }
},
    { timestamps: true })
const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject