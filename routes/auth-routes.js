// imports start
const { Router } = require("express");
const Config = require("config");
const { check, validationResult } = require("express-validator");
const Bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const User = require("../models/User");

// imports end

// constants start
const router = Router();
// constants end

// api/auth/register
router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Incorrect password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect registration data",
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      console.log("candidate", candidate);

      if (candidate) {
        return res.status(400).json({ message: "Such user already exists" });
      }

      const hashedPassword = await Bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "User has been successfully created" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something went wrong on server. Error code 500" });
    }
  }
);

// api/auth/login
router.post(
  "/login",
  [
    check("email", "Enter correct email").normalizeEmail().isEmail(),
    check("password", "Enter password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect login data",
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User was not found" });
      }

      const passwordMatch = await Bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(400)
          .json({ message: "Incorrect password, try again" });
      }

      const token = Jwt.sign({ userId: user.id }, Config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something went wrong on server. Error code 500" });
    }
  }
);

module.exports = router;
