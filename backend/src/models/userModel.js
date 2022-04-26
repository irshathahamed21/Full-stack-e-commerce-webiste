
const mongoose = require("mongoose")
const validator = require("validator")
const dotenv = require("dotenv")
dotenv.config()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")



const userSchema = new mongoose.Schema({
     
    name : {
        type:String,
        required:[true,"Please enter your name" ],
        maxLength:[30, "Name cannot exceed morethan 30 chararcters"],
        minlength:[4, "Name cannot be less than 4 characters"]
    
    },
    email:{
        type:String,
        required:[true,"Please enter your emai;" ],
        unique:true,
        validate:[validator.isEmail, "Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password" ],
        minlength:[8, "Name cannot be less than 4 characters"],
        select:false, 
    
    }, 
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }


    },
    role: {
        type:String,
        default:"user"
    },
     resetPasswordToken:String,
     resetPasswordExpire:Date 

})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  // JWT TOKEN
  userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  
  // Compare Password
  
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
    // return true if entered password is matched with the this.password
  };
  
  // Generating Password Reset Token
  userSchema.methods.getResetPasswordToken = function () {
 // Generating Token
    const resetToken = crypto.randomBytes(20).string("hex")
 // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000 
  
    return resetToken
  }


  






module.exports = mongoose.model("user", userSchema)