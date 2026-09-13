const JobApplication = require("../models/JobApplication.model");
const Job = require("../models/job.model");

// Submit an application (called at the end of the apply flow)
exports.submitApplication = async (req, res) => {
  try {
    const { jobId, contactInfo, address, resume } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "jobId is required" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Ek user ek job pe dobara apply na kar sake
    const existing = await JobApplication.findOne({ user: req.user._id, jobId });
    if (existing) {
      return res.status(400).json({ message: "You have already applied to this job" });
    }

    const application = await JobApplication.create({
      user: req.user._id,
      jobId,
      contactInfo,
      address,
      resume,
    });

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Logged-in user ki saari applications
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find({ user: req.user._id })
      .populate("jobId", "title company location")
      .sort({ createdAt: -1 });
    res.json({ applications });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Employer: ek specific job ke saare applicants
exports.getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Sirf wahi employer dekh sake jisne job post ki thi
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to view these applications" });
    }

    const applications = await JobApplication.find({ jobId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({ applications });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};