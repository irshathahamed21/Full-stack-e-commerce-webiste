
const app = require("./index")
const connect = require("./src/configs/db")
const cloudinary = require("cloudinary")



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
app.listen(3333,async() => {
    await connect().then(()=> {
        console.log("db is connected")

    })
    console.log("listening on port 3333")
})
