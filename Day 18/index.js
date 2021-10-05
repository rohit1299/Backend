// dependencies
const express = require("express");
const app = express();
const sequelize = require("./database/index");
require("dotenv").config();

// routes
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");

app.use(express.json());
app.get("/", (req, res) => res.send("Home"));
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.use((error, req, res, next) => {
  console.log(error.message);
});

sequelize
  .sync()
  .then(() => {
    console.log("Server is running at port 5000");
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error.message);
  });
