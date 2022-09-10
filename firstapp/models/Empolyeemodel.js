const mongoose = require('mongoose')
const Schema = mongoose.Schema
const employeeSchema = new Schema({
    name : {
        type : String
    },
    designtion : {
     type : String
    },
    email:{
        type : String
    },
    age : {
        type:Number
    },
    phone : {
        type : Number
    }
}, 
    {timestamps:true})

    const  Employee = mongoose.model('Employee', employeeSchema)
 module.exports =  Employee 