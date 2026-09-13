const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  country: { type: String, default: "Pakistan" },
  postcode: { type: String, default: "" },
  city: { type: String, default: "" },
  province: { type: String, default: "" },
  street: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Address", addressSchema);