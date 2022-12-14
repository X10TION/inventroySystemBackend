const express = require('express')
const router = express.Router()
const {registerUser, loginUser, logoutUser, getUser } = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')


// create user registration route
router.post('/register', registerUser )
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/getuser', protect, getUser)


module.exports = router