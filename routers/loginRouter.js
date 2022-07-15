const Router = require('express').Router()
const loginController = require("../controllers/loginController");

const loginRouter = Router

loginRouter.post("/", loginController.login)

module.exports = loginRouter