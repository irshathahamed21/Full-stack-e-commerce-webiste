 const express = require("express")

 const app = express()
 const bodyParser = require("body-parser")
 const fileUpload = require("express-fileupload")
 const cookieParser = require("cookie-parser")
 const productRoute = require("./src/routes/productRoute")
 const userRoute = require("./src/routes/userRoute")
 const orderRoute = require("./src/routes/orderRoute")
 const paymentRoute = require("./src/routes/paymentRoute")
 const dotenv = require("dotenv")
 const errorMiddleware = require("./src/middleware/error")

 dotenv.config()
 app.use(express.json())
 app.use(cookieParser())
 app.use(bodyParser.urlencoded({extended:true}))
 app.use(errorMiddleware)
 app.use(fileUpload())
 


 app.use("/irshath-e-commerce-store", productRoute)
 app.use("/irshath-e-commerce-store", userRoute)
 app.use("/irshath-e-commerce-store", orderRoute)
 app.use("/irshath-e-commerce-store", paymentRoute)


 module.exports = app