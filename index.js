const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./db")
const loginRouter = require("./routers/loginRouter");
const registerRouter = require("./routers/registerRouter");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/login", loginRouter)
app.use("/register", registerRouter)

app.listen(process.env.PORT, (req, res) => {
  console.log("Listen on port");
});