
const app = require("./index")
const connect = require("./src/configs/db")

app.listen(3333,async() => {
    await connect().then(()=> {
        console.log("db is connected")

    })
    console.log("listening on port 3333")
})
