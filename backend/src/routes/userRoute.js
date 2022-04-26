const {registerUser, loginUser, logout, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser} = require("../controllers/userController")

const express = require("express")
const { isAuthencticatedUser, authorizeRoles } = require("../middleware/auth")

const router = express.Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").get(logout)

router.route("/me").get(isAuthencticatedUser,getUserDetails)

router.route("/update/password").put(isAuthencticatedUser, updatePassword)

router.route("/me/update").put(isAuthencticatedUser, updateProfile)

router.route("/admin/users").get(isAuthencticatedUser,authorizeRoles("admin"),getAllUsers)

router.route("/admin/user/:id").get(isAuthencticatedUser,authorizeRoles("admin"),getSingleUser)
.put(isAuthencticatedUser,authorizeRoles("admin"), updateUserRole)
.delete(isAuthencticatedUser,authorizeRoles("admin"),deleteUser)



module.exports = router;

