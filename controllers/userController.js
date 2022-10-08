const asyncHandler = require('../middleware/asyncHandler')
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

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

module.exports = {
    registerUser
}