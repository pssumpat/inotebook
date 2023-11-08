const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");
const JWT_SECRET = "Sumitisagoodboy";

// Router 1 : Create a user using POST "/api/auth/createuser" | No Login Required
router.post("/createuser",
  [
    body("name", "Name can not be less then 5 characters").isLength({ min: 5 }),
    body("email", "Email not valid").trim().isEmail(),
    body("password", "Password can not be less then 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    let success = false;
    if (!error.isEmpty()) {
      return res.status(400).json({ success,error: error.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry, user with same email already exists" });
      }

      const salt = await bcrypt.genSaltSync(10);
      const newPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: newPass,
      });

      let data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.status(200).json({success, authToken });
    } catch (error) {
      console.log(error);
      return res.status(500).json({success:false, error: "Internal server error" });
    }
  }
);

// Router 2 : Authenticate a user using POST "/api/auth/login" | No Login Required
router.post("/login",
  [
    body("email", "Enter a valid Email").trim().isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    let success = false;
    if (!error.isEmpty()) {
      return res.status(400).json({success, error: error.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }

      let data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.status(200).json({success, authToken });
    } catch (error) {
      console.log(error);
      success=false;
      return res.status(500).json({success, error: "Internal server error" });
    }
  }
);

// Router 2 : Get logged in user details using POST "/api/auth/getuser" | Login Required
router.post("/getuser", fetchUser , async (req,res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
      }


})
module.exports = router;
