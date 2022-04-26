 const express = require("express")

 const app = express()
 const cookieParser = require("cookie-parser")
 const productRoute = require("./src/routes/productRoute")
 const userRoute = require("./src/routes/userRoute")
 const orderRoute = require("./src/routes/orderRoute")
 
 const errorMiddleware = require("./src/middleware/error")

 app.use(express.json())
 app.use(cookieParser())
 
 app.use(errorMiddleware)
 


 app.use("/irshath-e-commerce-store", productRoute)
 app.use("/irshath-e-commerce-store", userRoute)
 app.use("/irshath-e-commerce-store", orderRoute)

 module.exports = app