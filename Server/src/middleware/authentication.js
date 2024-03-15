const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../../config.js");
const secretKey = config.SECRET_KEY;

exports.authentication = async (req, res, next) => {
  try {
    const token = req.header("authorization");

    const decodeToken = jwt.verify(token, secretKey);
    const user = await User.findOne({ email: decodeToken.userId });

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Time out please sign in" });
    } else {
      console.log("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
