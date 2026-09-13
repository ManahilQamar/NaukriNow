const express = require("express");
const { signup, login, googleAuth, setRole } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleAuth);
router.post("/set-role", protect, setRole);

module.exports = router; 
