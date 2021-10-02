const express = require("express")
const app = express()

const middleware_function = (req, res, next) => {
    console.log("This is middleware")
    next()
}
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.get("/", middleware_function, (req, res) => {
    res.send("<h1>Hello Express</h1>")
})

app.listen(3000, () => console.log("Listening at http://localhost:3000"))