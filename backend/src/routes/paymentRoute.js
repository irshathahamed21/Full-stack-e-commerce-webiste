const express = require("express")

const router = express.Router()


const {processPayment, sendStripeApiKey} = require("../controllers/paymentController")
const { isAuthencticatedUser } = require("../middleware/auth")

 router.route("/payment/process").post( isAuthencticatedUser,processPayment)

 router.route("/stripeapikey").get(isAuthencticatedUser, sendStripeApiKey)

 module.exports = router;