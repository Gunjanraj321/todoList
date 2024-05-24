const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {sendSuccessEmail} = require("../service/mailService");


// signup function for the user to sign in
const processSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "missing required fields",
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ userId: newUser.id }, process.env.jwtSecret);
    // const subject = "Registration Successful";
    // const text = "Thank you for registering. Your registration was successful.";
    //await sendSuccessEmail(email,subject,text);
    res.status(201).json({
      message:
        "registration successful. Check your email for a confirmation message",
      token: token,
    });
  } catch (err) {
    console.log("error during sign-up");
    res.status(500).json({
      error: "an error occurred while registering the user",
    });
  }
};

//login function for the user to login
const processLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    const token = jwt.sign({ userId: user.id }, process.env.jwtSecret);

    if (passwordMatch) {
      console.log("password match");
      //Passwords match, so the user is authenticated
      // const subject = "Login Successful";
      // const text = "Thank you for logging in. Your login was successful.";
      // //await sendSuccessEmail(email,subject,text);

      res.status(200).json({ message: "login successfully", token });
    } else {
      console.log("password not match");
      // Passwords don't match
      res.status(409).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the login" });
  }
};





module.exports = {
  processSignUp,
  processLogin,
};
