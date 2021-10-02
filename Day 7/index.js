const express = require("express")
const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

var userList = [{
    username: 'arnab',
    password: 'password'
}]

app.get("/", (req, res) => {
    res.render("index")
})

app.post("/login", (req, res) => {
    let user = {
        username : req.query.username,
        password : req.query.password
    }
    userList.push(user)
    res.send(user)
})

app.get("/user/:username", (req, res) => {
    userList.forEach((user) => {
        if(req.params.username === user.username){
            res.send(userList)
        }
    })
    res.send("Username not found")
})

app.listen(3000, () => console.log("Listing at http://localhost:3000"))