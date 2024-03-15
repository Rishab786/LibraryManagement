const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config.js");
const User = require("../models/User");
const secretKey = config.SECRET_KEY;

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = new User({
      name,
      email,
      password,
      role,
    });

    user.password = await bcrypt.hash(password, 10);

    await user.save();
    const token = jwt.sign({ userId: email }, secretKey);

    res.send({ token: token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: email }, secretKey);

    res.send({ token: token, role: user.role });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
