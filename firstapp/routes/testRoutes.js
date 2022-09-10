
const express = require('express')
const router = express.Router()
const testController = require('../controllers/testController')


router.get('/find',testController.find)
router.get('/filter',testController.filter)
router.get('/list',testController.list)
router.get('/mark',testController.marks)
router.get('/total',testController.total)
router.get('/marklist1',testController.marklist1)
router.get('/marklist2',testController.marklist2)
router.get('/getAllMarks',testController.getAllMarks)

//qurey
module.exports = router
