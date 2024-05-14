require("dotenv").config();
const { User } = require("../Model/User.Model");
const jwt = require("jsonwebtoken");
const ApiError = require("../Utilties/ApiError");
const { sendEmail } = require("../Utilties/otpSender");


module.exports.createUser = async (req, res) => {
  try {
    const { username, email, password, gender, mobile, address } = req.body;

    // Validate request body
    if (username === "" || email === "" || password === "" || gender === "" || mobile === "" || address === "") {
      throw new ApiError(400, "All Fields Are Required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "User Already Exists With Same Email");
    }

    // Generate registration code and send email
    const registrationCode = Math.floor(100000 + Math.random() * 900000);
    await sendEmail(email, registrationCode);

    // Create new user
    const newUser = new User({
      username,
      email,
      password,
      gender,
      mobile,
      address,
      otp: registrationCode,
      isActive: false,
      token: ""
    });
    await newUser.save();

    // Return created user data (without sensitive fields)
    const createdUser = await User.findOne({ email }).select(
      "-password -otp -token"
    );
    res.status(200).send({ message: "User Created", data: createdUser });
  } catch (error) {
    console.error(error.message);
    res.status(error.statusCode || 500).send(new ApiError(error.statusCode || 500, error.message));
  }
};

module.exports.ActivateUser = async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      const user = await User.findOne({ email, otp });
      if (!user) {
        return res.status(400).json({ message: "Invalid verification code" });
      }
      user.isActive = true;
      await user.save();
      res.status(200).json({ message: "User activated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  module.exports.LoginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email, password });
      if (!user) {
        return res.status(201).json({ message: "Invalid Email or Password" });
      }
      if (user.isActive === false) {
        return res.status(202).json({ message: "Email not verified!" });
      }
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY);
      user.token = token;
      await user.save();
      const loginUser = await User.findOne({email, password}).select("-password -otp");
      return res.status(200).json({ message: "Login Successfully!", data: loginUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };




























/*const { User } = require("../Model/User.Model");
const ApiError = require("../Utilties/ApiError");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../Utilties/otpSender");
const ApiResponse = require("../Utilties/ApiResponse");

module.exports.createUser = async (req, res) => {
  try {
    const { username, email, password, gender, mobile, address } = req.body;
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      gender === "" ||
      mobile === "" ||
      address === ""
    ) {
      return res.status(400).send(new ApiError(400, "All Fields Are Required"));
    }
    const user = User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .send(new ApiError(400, "Already User Exist With Same Email"));
    }
    const registrationCode = Math.floor(100000 + Math.random() * 900000);
    sendEmail(email, registrationCode);
    const newUser = new User({
      username,
      email,
      password,
      gender,
      mobile,
      address,
      otp: registrationCode,
      isActive: false,
      token: "",
    });
    await newUser.save();
    const createdUser = await User.findOne({ email }).select(
      "-password -otp -token"
    );
    console.log(createdUser);
    res.status(200).send({ message: "user created", data: createdUser });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(new ApiError(500, "Server Erron"));
  }
};
*/