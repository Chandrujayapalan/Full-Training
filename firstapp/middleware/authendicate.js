const jwt = require('jsonwebtoken')


const authendicate = (req,res,next)=>{
    try {
        const token   = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token,'Secretvalue')
        console.log(decode)
        req.user = decode
        next()
    }
    catch(error){
        res.json({ 
        message : 'Authendication failed !'
        })
    }
}
module.exports = authendicate