const asyncHandler = require('../middleware/asyncHandler')

const registerUser = asyncHandler(async(req,res) => {
    const {email} = req.body
    if(!email){
        res.status(400)
        throw new Error("please add email")
    }
    
    res.send('register user')
})










module.exports = {
    registerUser
}