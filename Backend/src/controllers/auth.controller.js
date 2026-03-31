const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");
const sendEmail = require("../utils/mailer");
const resetPasswordTemplate = require("../utils/resetPasswordTemplate");

// name -- registerUserController
// description -- register a new user
// access -- public
async function registerUserController(req, res) {
  try {
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide username, email and password",
      });
    }

    const strongRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

    if (!strongRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, number, and special character",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hash,
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// name -- loginUserController
// description -- login user
// access -- public
async function loginUserController(req, res) {
  try {
    let { email, password } = req.body;

    email = email.toLowerCase();

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// name -- logoutUserController
// description -- logout user
// access -- public
async function logoutUserController(req, res) {
  try {
    const token = req.cookies.token;

    if (token) {
      await tokenBlacklistModel.create({ token });
    }

    res.clearCookie("token");

    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// name -- getMeController
// description -- get logged in user details
// access -- private
async function getMeController(req, res) {
  try {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
      message: "User details fetched successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// name -- forgotPasswordController
// description -- send OTP to email
// access -- public
async function forgotPasswordController(req, res) {
  try {
    let { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    email = email.toLowerCase();

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email",
      });
    }

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    // 🔗 reset link
    const resetLink = `http://localhost:5173/reset-password?email=${encodeURIComponent(email)}&otp=${otp}`;

    const html = resetPasswordTemplate(otp, resetLink);

    try {
      await sendEmail(email, "Reset Your Password", html);
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
      return res.status(500).json({
        message: "Failed to send OTP email. Please try again later.",
      });
    }

    res.status(200).json({
      message: "OTP sent to your email",
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

// name -- resetPasswordController
// description -- verify OTP and reset password
// access -- public
async function resetPasswordController(req, res) {
  try {
    let { email, otp, password } = req.body;

    // Validate input
    if (!email || !otp || !password) {
      return res.status(400).json({
        message: "Email, OTP, and password are required",
      });
    }

    email = email.toLowerCase();

    // Validate password strength
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    if (!hasMinLength || !hasUppercase || !hasNumber || !hasSpecialChar) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters with uppercase, number, and special character",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or OTP",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP has expired. Please request a new one.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
  forgotPasswordController,
  resetPasswordController,
};
