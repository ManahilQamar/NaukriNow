const Contact = require("../models/Contact.model");

// Get contact information for logged-in user
exports.getContactInfo = async (req, res) => {
  try {
    const contactInfo = await Contact.findOne({ userId: req.user._id });
    
    if (!contactInfo) {
      return res.status(404).json({ 
        message: "Contact information not found",
        // Return default structure
        contactInfo: {
          email: req.user.email,
          firstName: "",
          lastName: "",
          phoneCode: "+92",
          phoneNumber: ""
        }
      });
    }
    
    res.json({ contactInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or update contact information
exports.createOrUpdateContactInfo = async (req, res) => {
  try {
    const { firstName, lastName, phoneCode, phoneNumber } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName) {
      return res.status(400).json({ 
        message: "First name and last name are required" 
      });
    }
    
    // Check if contact info already exists
    let contactInfo = await Contact.findOne({ userId: req.user._id });
    
    if (contactInfo) {
      // Update existing contact info
      contactInfo.firstName = firstName;
      contactInfo.lastName = lastName;
      contactInfo.phoneCode = phoneCode;
      contactInfo.phoneNumber = phoneNumber;
    } else {
      // Create new contact info
      contactInfo = new Contact({
        userId: req.user._id,
        email: req.user.email,
        firstName,
        lastName,
        phoneCode,
        phoneNumber
      });
    }
    
    await contactInfo.save();
    res.json({ 
      message: "Contact information saved successfully", 
      contactInfo 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};