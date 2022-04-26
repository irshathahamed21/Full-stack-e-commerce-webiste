const jwt = require("jsonwebtoken")
const User = require("../models/userModel")


exports.isAuthencticatedUser = async(req,res,next) => {

    const {token} = req.cookies
    // console.log(token)
    if(!token) {
       return res.status(401).json({
            message:"please login to access the feature"
        })
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET)
    // console.log(decodedData)

   req.user = await User.findById(decodedData.id)
   next()

}

exports.authorizeRoles = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
           return res.status(403).send({message : `Role ${req.user.role} is not allowed to access this resource` })

        }
        // if user is admin then if condtion will be false
        next()

    }


    
}