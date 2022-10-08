const express = require('express')
const router = express.Router()
const {registerUser, loginUser } = require('../controllers/userController')



// create user registration route
router.post('/register', registerUser )
router.post('/login', loginUser)


module.exports = router