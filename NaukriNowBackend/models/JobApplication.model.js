const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  contactInfo: {
    firstName: String,
    lastName: String,
    email: String,
    phoneCode: String,
    phoneNumber: String,
  },
  address: {
    country: String,
    postcode: String,
    city: String,
    province: String,
    street: String,
  },
  resume: {
    fileUrl: String, // agar file upload karte ho
    type: String,    // pdf, docx etc
  },
}, { timestamps: true });

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
