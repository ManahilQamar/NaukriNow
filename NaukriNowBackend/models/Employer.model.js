const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // ek user ka sirf ek employer profile ho sakta hai
  },
  companyName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  source: { type: String, default: "" }, // "How did you hear about us?"
  countryCode: { type: String, default: "+92" },
  phone: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Employer", employerSchema);