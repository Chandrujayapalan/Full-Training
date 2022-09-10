
const Employee = require('../models/Empolyeemodel')

const  index = (req , res , next)=> {

    Employee.find()
    .then(response=>{
res.json({
    response
})

    })
    .catch(error => {
res.json({
    message:'an error  Occured'

})
    })
}
// show 
const show = (req,res, next)=>{
    let employeId = req.body.employeId
    Employee.findById(employeId)
    .then(response=>{
        res.json({
           response
        })
    })
    .catch(error=>{
        res.json({    
             message : 'error'
   
    })
})
}

const store = (req,res, next)=>{
let employee = new Employee({
name : req.body.name,
designtion : req.body.designtion,
age :req.body.age  ,
phone : req.body.phone,
email:req.body.email
})
employee.save()
.then(response=>
{res.json({
    message: 'empolyee  Added successfully'
})
})
.catch(error =>{
    res.json({
        message:'an erro occured'
    })
})
}

//update 

const update = (req, res, next)=>
{
    let employeId = req.body.employeId
    let updatedata = {  
    name : req.body.name,
    designtion : req.body.designtion,
    age :req.body.age,
    phone : req.body.phone,
    email:req.body.email
    }

    Employee.findByIdAndUpdate(employeId,{$set:updatedata})


.then (()=>{
    res.json({
        message:'succusefully'
    })
})
.catch(error =>{
    res.json({
         message : 'an occur error'
    })
})
}

//delete

const destroy =  (req, res, next)=>
{
    let employeId = req.body.employeId
 Employee.findByIdAndRemove(employeId)
 .then(()=>{
     res.json({
         message:'deleted'

     })

 })
 .catch(error=>{

    res.json({
        message: 'error'
    })
 })
}


module.exports = {
    index, show, store , update , destroy 
}
