const express = require('express')
const router = express.Router()
const authendicate = require('../middleware/authendicate')

const EmpolyeeController = require('../controllers/EmpolyeeController')

router.get ('/',authendicate, EmpolyeeController.index)
// router.get ('/', EmpolyeeController.index)
router.post ('/show' ,authendicate, EmpolyeeController.show,)
router.post ('/store' ,authendicate, EmpolyeeController.store)
router.post ('/destroy' , authendicate,EmpolyeeController.destroy)
router.post('/update' ,authendicate, EmpolyeeController.update)

module.exports = router