const express = require("express");
const { processSignUp, processLogin } = require("../controller/authController");

const authRouter = express.Router();

authRouter.post("/signup", processSignUp);
authRouter.post("/login", processLogin);

module.exports = authRouter;
