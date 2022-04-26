const express = require("express")
const { newOrder } = require("../controllers/orderController")
const { isAuthencticatedUser } = require("../middleware/auth")
const router = express.Router()

router.route("/order/new").post(isAuthencticatedUser, newOrder)

module.exports = router