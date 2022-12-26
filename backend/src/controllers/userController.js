
const { options } = require("../..")
const User = require("../models/userModel")
const sendToken = require("../utilities/sendToken")
const cloudinary = require("cloudinary")

// register a user

exports.registerUser = async (req, res, next) => {

    try {

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder:"avatars",
            width:150,
            crop:"scale"

        })



        const { name, email, password } = req.body

        const user = await User.create(
            {
                name: name,
                email: email,
                password: password,
                avatar: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            }
        )
        console.log(user)
        sendToken(user, 201, res)
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ success:false, error: error.message })
    }

}

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "please enter email and password"
            })
        }
        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return res.status(401).json({
                message: "Invalid email Please enter valid email"

            })

        }

        const isPasswordMatched = await user.comparePassword(password)

        if (!isPasswordMatched) {
            return res.status(401).json({
                message: "Invalid password Please enter valid password"

            })
        }

        sendToken(user, 200, res)
    }
    catch (error) {
        return res.status(500).json({ success:false, success:false,  message:error.message })
    }

}


exports.logout = async (req, res) => {



    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    // making token null and expiring now

    res.status(200).json({
        succes: true,
        message: "logged out successfully"
    })

}

exports.forgotPassword = async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "email does not exist"
        })
    }

    const resetToken = user.getResetPasswordToken()

    await user.save({ valideBeforeSave: false })

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/password/reset/${resetToken}`;


    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return res.status(500).json({
            success:false,  message:error.message
        })
    }
}

// Reset Password
exports.resetPassword = async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return res.status().json({})
    }

    if (req.body.password !== req.body.confirmPassword) {
        return res.status().json({})
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
};


// GET  user details
exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        return res.status(200).json({
            success: true,
            user
        })
    }
    catch (error) {
        return res.status(501).json({
            success:false,  message:error.message
        })
    }
}


// update user password by the user 

exports.updatePassword = async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select("+password")

        const isPasswordMatched = await user.comparePassword(req.body.oldPassword)


        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: "old password is not matched"
            })
        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "password does not match"
            })

        }

        user.password = req.body.newPassword
        await user.save()

        sendToken(user, 200, res)
    }
    catch (error) {
        return res.status(501).json({
            success:false,  message:error.message
        })
    }

}


exports.updateProfile = async (req, res) => {
    try {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
    
        const imageId = user.avatar.public_id;
    
        await cloudinary.v2.uploader.destroy(imageId);
    
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
    
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    
      const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    
      res.status(200).json({
        success: true,
      });
    }
    catch(error){
        res.status(200).json({
            success: false, message:error.message
        });
    }
}


// get all users by admin

exports.getAllUsers = async(req,res) => {

    
    try {
        const users = await User.find()

        res.status(200).json({
        success:true,
        users
    })
    } catch (error) {
        return res.status(501).json({
            success: false, message:error.message
        })
    }
    
}

// get a single user by admin

exports.getSingleUser = async(req,res) => {

    try {
        const user = await User.findById(req.params.id)

        if(!user) {
            res.status(400).json({
                message:"user does not exist"
            })
        }
    
    
        res.status(200).json({
            success:true,
            user
        })
    }
    catch(error){
        return res.status(500).json({
            success: false, message:error.message
        })
    }
   
    
}
// update profile by admin 
// update role only by the admin
exports.updateUserRole = async (req, res) => {

    try {
        const newUserDetails = {
            name: req.body.name,
            email: req.body.email,
            role:req.body.role
        }
    
        const user = await User.findByIdAndUpdate(req.params.id, newUserDetails, {
            new:true,
            runValidators:true,
            useFindAndModify:false
    
        } )
    
        res.status(200).json({
            success:true,
            user
        })
    }
    catch(error){
        return res.status(500).json({
            success: false, message:error.message
        })
    }
   
}

// delete a user by admin

exports.deleteUser = async(req,res) => {

    try {
        const user = await User.findById(req.params.id)

        if(!user) {
            res.status(400).json({
                message:"user does not exist"
            })
        }
        await cloudinary.v2.uploader.destroy(user.avatar.public_id)
        await user.remove()
        res.status(200).json({
            success:true,
            message:"user deleted successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false, message:error.message
        })
    }
   
}









