const jwt    =  require ('jsonwebtoken')
const { token } = require('morgan')

const addressMake = require('../models/address')
const User = require('../models/User')

const showAddress = (req,res,next)=>
{
    addressMake.find({
        userId : req.user._id
    })

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


const addressStore = (req,res, next)=>{

    // console.log(_id)

    let address = new addressMake({
    address : req.body.address,
    userId : req.user._id

    })
    address.save()
    .then(()=>
    {
        
        res.json({

        message: 'added successfully',

    })
})
 .catch(error =>{
        res.json({
            message:'an erro occured'
        })
    })
}  
const updateAddress =(req,res,next)=>{

    let addressId = req.body.addressId
    let updateAddress = {  
   address: req.body.address
    }

    addressMake.findByIdAndUpdate(addressId,{$set:updateAddress})


.then ((result)=>{

    
    res.json({
        message:'succusefully',
    
    })
})
.catch(error =>{
    res.json({
         message : 'an occur error'
    })
})
}
const addressDelete =  (req, res, next)=>
{
 
    let addressId = req.body.addressId
    addressMake.findByIdAndRemove(addressId)
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

// const addressShow = (req,res, next)=>{
//     let address = req.user.userId
//     addressMake.findById(address)
//     .then(response=>{
//         res.json({
//            response
//         })
//     })
//     .catch(error=>{
//         res.json({    
//              message : 'error'
   
//     })
// })
// }

module.exports = {showAddress,addressStore,updateAddress,addressDelete}