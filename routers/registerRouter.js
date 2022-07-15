const Router = require('express').Router()
const registerController = require("../controllers/registerController");

const registerRouter = Router

registerRouter.post("/", registerController.register)

module.exports = registerRouter