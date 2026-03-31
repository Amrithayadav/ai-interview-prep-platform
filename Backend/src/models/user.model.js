const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already exists"],
        required: [true, "Username is required"]
    },
    email:{
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    otp: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    }
  
})

const userModel = mongoose.model("Users", userSchema)

module.exports = userModel
