const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  submitApplication,
  getMyApplications,
  getApplicationsForJob,
} = require("../controllers/jobApplication.controller");

router.post("/", protect, submitApplication);
router.get("/my", protect, getMyApplications);
router.get("/job/:jobId", protect, getApplicationsForJob);

module.exports = router;