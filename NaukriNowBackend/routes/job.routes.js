const express = require("express");
const router = express.Router();
const { postJob, getJobs } = require("../controllers/job.controller.js");
const { protect } = require("../middleware/auth.middleware.js");

// POST job - Protected (employer only)
router.post("/", protect, postJob);

// GET jobs - Public
router.get("/", getJobs);

module.exports = router;
