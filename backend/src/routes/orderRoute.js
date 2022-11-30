const express = require("express")
const { newOrder, myOrders, getSingleOrder, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController")
const { isAuthencticatedUser, authorizeRoles } = require("../middleware/auth")
const router = express.Router()

router.route("/order/new").post(isAuthencticatedUser, newOrder)

router.route("/orders/me").get(isAuthencticatedUser, myOrders)

router.route("/order/:id").get(isAuthencticatedUser, getSingleOrder)

router.route("/admin/orders").get(isAuthencticatedUser, authorizeRoles("admin"), getAllOrders)

router.route("/admin/order/:id").put(isAuthencticatedUser, authorizeRoles("admin"), updateOrder)
.delete(isAuthencticatedUser, authorizeRoles("admin"), deleteOrder)


module.exports = router