const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  email: { 
    type: String, 
    required: true 
  },
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  phoneCode: { 
    type: String, 
    default: '+92' 
  },
  phoneNumber: { 
    type: String, 
    default: '' 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Contact", contactSchema);