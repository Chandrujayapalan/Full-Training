
const express = require('express')
const router = express.Router()
const Authcontroller = require('../controllers/authController')
const addressController = require('../controllers/addressController')
const authendicate = require('../middleware/authendicate')

let validator = require('express-joi-validation').createValidator({
    passError:true
    })
const registermethod = require('../validator/validator')

router.post('/register',validator.body(registermethod),
 Authcontroller.register)
router.post('/login', Authcontroller.login)


router.post('/',authendicate, addressController.addressStore)
router.delete('/', authendicate,addressController.addressDelete)
router.put('/', authendicate,addressController.updateAddress)
router.get('/', authendicate,addressController.showAddress)
module.exports = router
