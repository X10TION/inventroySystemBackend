const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')



const userSchema = mongoose.Schema({
    name:{
        type:String,
        require: [true, "please add a name"]
    },
    email:{
        type:String,
        require:[true, "please Provide an email"],
        unique: true,
        trim: true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email"
        ]
    },
    password:{
        type:String,
        require: [true, "please Provide an password"],
        minLength:[6,"password must be up to 6 character"],
        // maxLength:[53,"password must not be more than 20 character"]
    },
    photo:{
        type: String,
        require: [true, "please add a photo"],
        default:""
    },
    phone:{
        type:String,
        default:"+234"
    },
    bio:{
        type:String,
        default:"bio",
        maxLength:[250,"bio must not be more than 20 character"]
    },

},{
    timestamps: true
})

// encrypt password before save to databse
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next()
    }
// hashed password 
 //   password encrption before save to databse
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword
    next()

})

const User = mongoose.model("User", userSchema)

module.exports = User