// models/User.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false, // hide in queries
    },
    googleId: {
      type: String,
      default: null, // for Google users
    },
    profileImage: {
      type: String,
      default: null, // Google profile picture or custom
    },
  role: {
  type: String,
  enum: ["user", "employer", "admin"],
  default: "user",
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
