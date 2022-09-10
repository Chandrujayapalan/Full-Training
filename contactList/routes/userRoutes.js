const express = require('express')
const router = express.Router()

const controllers = require('../controller/userController')
const authenticating = require('../middleware/authendicate')

router.post('/register', controllers.register)
router.post('/login', controllers.login)
router.get('/userGet', controllers.userget)
router.post('/reqFrd', authenticating.authenticating, controllers.request)
router.get('/contactGet', authenticating.authenticating, controllers.contactGet)
router.get('/getUser', authenticating.authenticating, controllers.getUser)
router.get('/listFriend', authenticating.authenticating, controllers.listFriend)
router.put('/findacc', authenticating.authenticating, controllers.findandAccepted)
module.exports = router  