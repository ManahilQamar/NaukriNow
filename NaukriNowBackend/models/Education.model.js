const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  educationLevel: { type: String, required: true },
  fieldOfStudy: { type: String, default: "" },
  schoolName: { type: String, required: true },
  country: { type: String, default: "Pakistan" },
  schoolLocation: { type: String, default: "" },
  currentlyEnrolled: { type: Boolean, default: false },
  startMonth: { type: Number, required: true },
  startYear: { type: Number, required: true },
  endMonth: { type: Number },
  endYear: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model("Education", educationSchema);