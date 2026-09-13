const Employer = require("../models/Employer.model");
const User = require("../models/User.model");

// Employer profile create/update karo
exports.createOrUpdateEmployer = async (req, res) => {
  try {
    const { companyName, firstName, lastName, source, countryCode, phone } = req.body;

    if (!companyName || !firstName || !lastName) {
      return res.status(400).json({ message: "Company name, first name and last name are required" });
    }

    let employer = await Employer.findOne({ userId: req.user._id });

    if (employer) {
      employer.companyName = companyName;
      employer.firstName = firstName;
      employer.lastName = lastName;
      employer.source = source;
      employer.countryCode = countryCode;
      employer.phone = phone;
      await employer.save();
    } else {
      employer = await Employer.create({
        userId: req.user._id,
        companyName,
        firstName,
        lastName,
        source,
        countryCode,
        phone,
      });
    }

    // User ka role bhi "employer" set kar do
    await User.findByIdAndUpdate(req.user._id, { role: "employer" });

    res.status(201).json({ message: "Employer profile saved successfully", employer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Employer profile get karo (logged-in user ka)
exports.getEmployer = async (req, res) => {
  try {
    const employer = await Employer.findOne({ userId: req.user._id });
    if (!employer) {
      return res.status(404).json({ message: "Employer profile not found" });
    }
    res.json({ employer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};