const asyncHandler = require('../middleware/asyncHandler')
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

const protect = asyncHandler(async(req, res, next) => {
        try{
            const token = req.cookie.token
            if(!token){
                res.status(401)
                throw new Error("Not Authorized, please login")
            }
                // verify Token
                const verified = jwt.verify(token,process.env.JWT_SECRET)
                // get user details from token (id)
               const user = await User.findById(verified.id).select("-password")

                if(!user){
                    res.status(401)
                    throw new Error("User Not found")
                }
                req.user = user
                next()
        }catch(err){
            res.status(401)
            throw new Error("Not Authorized, please login")
        }
})
module.exports = protect