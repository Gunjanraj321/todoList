require("dotenv").config();
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

//verfying the jwt token
const verify = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    // console.log(token);
    const key = process.env.jwtSecret;

    //token = token.replace("Bearer ", "");

    const user = jwt.verify(token, key);
    User.findOne({ where: { id: user.userId } })
      .then((foundUser) => {
        if (foundUser) {
          req.user = user;
          next();
        } else {
          return res
            .status(401)
            .json({ success: false, message: "User not found" });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "An error occurred while fetching the user",
        });
      });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Token verification failed" });
  }
};

module.exports = { verify };
