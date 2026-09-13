const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const { getAddress, saveAddress } = require("../controllers/address.controller");

router.get("/", protect, getAddress);
router.post("/", protect, saveAddress);

module.exports = router;