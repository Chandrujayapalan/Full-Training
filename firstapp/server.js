const express = require('express')
const mongoose = require ('mongoose')
const morgan = require ('morgan')
const bodypraser = require ('body-parser')

const EmployeeReouter = require('./routes/Employeeroutes')
const Empolyee = require('./models/Empolyeemodel')

const Authcontroller = require('./routes/authroute')
const testController = require('./routes/testRoutes')
const addressController = require ('./routes/authroute')
mongoose.connect('mongodb+srv://ChandruJ:chandrucj@cluster0.h58p2.mongodb.net/FirstDatabase?retryWrites=true&w=majority',{useNewUrlParser : true, useUnifiedTopology : true})

const db = mongoose.connection
db.on('error',(err)=>{
    console.log(err)
})
db.once('open',()=>
{
console.log('Database connection Established !')
})
const app = express()
app.use (morgan('dev'))
app.use(bodypraser.urlencoded({extended:true}))
app.use(bodypraser.json())
const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{

    console.log (`server is running ${PORT} `)})

    app.use ('/api/empolyee' , EmployeeReouter )

    app.use ('/api', Authcontroller )
    app.use ('/api', addressController)
    app.use('/v2/api',testController)