const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const authRouter = Router();
const authMiddleware = require('../middlewares/auth.middleware');

// 🔥 IMPORTANT: require BEFORE using
const rateLimit = require("express-rate-limit");


// 🔐 Forgot Password limiter (very strict)
// allows only 3 OTP requests in 5 minutes
const forgotPasswordLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3,
  message: {
    message: "Too many OTP requests. Please try again after 5 minutes."
  }
});


// 🔐 Login limiter (medium)
// allows 10 login attempts per minute
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  message: {
    message: "Too many login attempts. Try again later."
  }
});


// POST /api/auth/register
// description ---- register a new user
// access --- public
authRouter.post(
  "/register",
  authController.registerUserController
);


// POST /api/auth/login
// description -- login user with email and password
// access -- public
authRouter.post(
  "/login",
  loginLimiter, // 🔐 rate limit applied
  authController.loginUserController
);


// GET /api/auth/logout
// description -- logout user by blacklisting the token
// access -- public
authRouter.get(
  "/logout",
  authController.logoutUserController
);


// GET /api/auth/get-me
// description -- get the details of the logged in user
// access -- private
authRouter.get(
  "/get-me",
  authMiddleware.authUser,
  authController.getMeController
);


// POST /api/auth/forgot-password
// description -- send OTP to user's email for password reset
// access -- public
authRouter.post(
  "/forgot-password",
  forgotPasswordLimiter, // 🔐 strict rate limit
  authController.forgotPasswordController
);


// POST /api/auth/reset-password
// description -- verify OTP and reset password
// access -- public
authRouter.post(
  "/reset-password",
  authController.resetPasswordController
);


module.exports = authRouter;