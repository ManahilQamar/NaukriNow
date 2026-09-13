const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const { createOrUpdateEmployer, getEmployer } = require("../controllers/employer.controller");

router.post("/", protect, createOrUpdateEmployer);
router.get("/", protect, getEmployer);

module.exports = router;