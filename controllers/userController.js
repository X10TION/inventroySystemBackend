const asyncHandler = require('../middleware/asyncHandler')
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
// generate token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,
        {expiresIn: "1d"}
        )
}

const registerUser = asyncHandler(async(req,res) => {
    const {name,password,email} = req.body
//    validation
    if(!name|| !email || !password){
        res.status(400)
        throw new Error("please fill in all required fileld")
    }
    if(password.length < 6 || password.length > 20 ){
        res.status(400)
        throw new Error("password must be minimun of 6 and maximun of 20")
    }
    //    validation existing user
       const userExist = await User.findOne({email}) 
       if(userExist){
        res.status(400)
        throw new Error("User with this email exist")
       }
    //     create new user 
    const saveUser = await User.create({
        name,
        email,
        password
    })
            ///generate token
            const token = generateToken(saveUser._id)
            // send http cookie only
            res.cookie("token",token,{
                path:"/",
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400), // 1 day
                sameSite: "none",
                secure: true
            })
    if(saveUser){
        const {_id, name, email,bio, photo, phone } = saveUser
        res.status(201).json({
           _id,name,email,bio, photo, phone,token
        })
    }else{
        res.status(400)
        throw new Error("Invalide User Data")
    }
})


// login User
const loginUser = asyncHandler(async(req,res) => {
        const {email, password} = req.body

        // validation of reqest
        if(!email || !password){
             res.status(400);
             throw new Error("please filled in the require fields")
        }
        // if user exist
        const user = await User.findOne({ email })
        if(!user){
            res.status(400);
            throw new Error("user not found please Sign up")
       }
    //    if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password)

     ///generate token
     const token = generateToken(user._id)
     // send http cookie only
     res.cookie("token",token,{
         path:"/",
         httpOnly: true,
         expires: new Date(Date.now() + 1000 * 86400), // 1 day
         sameSite: "none",
         secure: true
     })
    // get the user informations
    if(user && passwordIsCorrect){
        const {_id, name, email,bio, photo, phone } = user
        res.status(200).json({
           _id,name,email,bio, photo, phone,token
        });       
    } else {
        res.status(400);
            throw new Error("Invalide email or password")
    }
})

module.exports = {
    registerUser,
    loginUser
}