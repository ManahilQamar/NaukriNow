const Address = require("../models/Address.model");

exports.getAddress = async (req, res) => {
  try {
    const address = await Address.findOne({ userId: req.user._id });
    res.json({
      address: address || { country: "Pakistan", postcode: "", city: "", province: "", street: "" }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.saveAddress = async (req, res) => {
  try {
    const { country, postcode, city, province, street } = req.body;
    const address = await Address.findOneAndUpdate(
      { userId: req.user._id },
      { $set: { country, postcode, city, province, street } },
      { new: true, upsert: true }
    );
    res.json({ message: "Address saved successfully", address });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};