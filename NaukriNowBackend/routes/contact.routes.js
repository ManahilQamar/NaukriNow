const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const { 
  getContactInfo, 
  createOrUpdateContactInfo 
} = require("../controllers/contact.controller");

const router = express.Router();

router.get("/", protect, getContactInfo);
router.post("/", protect, createOrUpdateContactInfo);

module.exports = router;