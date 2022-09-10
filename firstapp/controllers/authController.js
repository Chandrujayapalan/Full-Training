const User = require ('../models/User')
const bycrpt = require('bcryptjs')
const jwt    =  require ('jsonwebtoken')


const register =  (req, res, next)=>{

bycrpt.hash(req.body.password, 10, function(err,hashedPass){
       
        if (err) {
            res.json ({
             error : err
            })
        }
        let user = new User ({
            name : req.body.name,
            phone :req.body.phone,
            gender :req.body.gender,
            DoB : req.body.DoB,
            bloodGroup: req.body.bloodGroup,
            email: req.body.email,
            password : hashedPass,
                  })
        user.save()
        .then(user=>{ 
            if(user){
            let token =  jwt.sign({email:user.email,name:user.name,_id:user._id},'personalvalue')
            res.json({
               
                message : 'Added successfully',
                token
        })
    }
    })
        .catch(error =>{
        res.json({
            message: error.message
        })
        })
})
}

const login = (req,res, next)=> {
    console.log("user",req.body.username)

    let username = req.body.username
    let password = req.body.password
    

    User.findOne({$or:[{email:username},{phone:username}]})
    .then(user=>{
        if(user){
        
            bycrpt.compare(password, user.password,(err,result)=>{
                if (err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token =  jwt.sign({name:user.name,_id:user._id},'Secretvalue',{expiresIn:'1hr'})

                    res.json({
                        message:'login Successful',
                        token 
                    })
                }
                else{
                    res.json({
                        message:'password does not match'
                    })
                }
            })

    }else{
        res.json({
            message:'no user found'
        })
    }

 })
}





module.exports = { register , login 
}
