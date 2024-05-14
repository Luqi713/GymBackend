const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },mobile: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },address: {
        type: String,
        required: true,
      },otp: {
        type: String,
        default: "",
      },token: {
        type: String,
        default: ""
      },
      isActive:{
        type: Boolean,
        default: false
      },
      date: {
        type: Date,
        default: Date.now
      }
},{timeseries:true});

module.exports.User = mongoose.model("User", userSchema);