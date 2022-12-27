
const express = require("express")


const app = express()

const router = express.Router()

const { createProduct, getAllProducts, getProductDetails, updateProduct
    , deleteProduct,
    createProductReview,
    getAllProductReviews,
    deleteProductReviews,
    getAdminProducts
} = require("../controllers/productController")
const { isAuthencticatedUser ,authorizeRoles} = require("../middleware/auth")


router.route("/products").get(getAllProducts)

router.route("/admin/products").get(isAuthencticatedUser, authorizeRoles("admin"), getAdminProducts)


router.route("/admin/product/new").post( isAuthencticatedUser,authorizeRoles("admin"),createProduct)

router.route("/admin/product/:id").put(isAuthencticatedUser,authorizeRoles("admin"),updateProduct)

router.route("/admin/product/:id").delete(isAuthencticatedUser,authorizeRoles("admin"),deleteProduct)

router.route("/product/:id").get(getProductDetails)

router.route("/review/create").put(isAuthencticatedUser,createProductReview)

router.route("/reviews").get(getAllProductReviews)
.delete(isAuthencticatedUser, deleteProductReviews)


module.exports = router





