const Education = require("../models/Education.model");

// Saare education entries laao is user ke
exports.getEducation = async (req, res) => {
  try {
    const education = await Education.find({ userId: req.user._id }).sort({ startYear: -1 });
    res.json({ education });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Naya education entry add karo
exports.addEducation = async (req, res) => {
  try {
    const {
      educationLevel, fieldOfStudy, schoolName, country,
      schoolLocation, currentlyEnrolled, startMonth, startYear, endMonth, endYear
    } = req.body;

    if (!educationLevel || !schoolName) {
      return res.status(400).json({ message: "Education level and school name are required" });
    }
    if (!startMonth || !startYear) {
      return res.status(400).json({ message: "Start date is required" });
    }
    if (!currentlyEnrolled && (!endMonth || !endYear)) {
      return res.status(400).json({ message: "End date is required" });
    }

    const education = await Education.create({
      userId: req.user._id,
      educationLevel,
      fieldOfStudy,
      schoolName,
      country,
      schoolLocation,
      currentlyEnrolled,
      startMonth,
      startYear,
      endMonth: currentlyEnrolled ? undefined : endMonth,
      endYear: currentlyEnrolled ? undefined : endYear,
    });

    res.status(201).json({ message: "Education details saved successfully", education });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Entry update karo
exports.updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const education = await Education.findOneAndUpdate(
      { _id: id, userId: req.user._id }, // sirf apni entry update kar sake, dusre ki nahi
      req.body,
      { new: true }
    );
    if (!education) return res.status(404).json({ message: "Education record not found" });
    res.json({ message: "Updated successfully", education });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Entry delete karo
exports.deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const education = await Education.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!education) return res.status(404).json({ message: "Education record not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};