const Job = require("../models/job.model.js");

const postJob = async (req, res) => {
  try {
    const { title, company, location, description, salary, minSalary, maxSalary, jobType, jobLocationType } = req.body;

    if (!title || !company || !location || !description) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newJob = new Job({
      title,
      company,
      location,
      description,
      salary,
      minSalary: minSalary ? Number(minSalary) : undefined,
      maxSalary: maxSalary ? Number(maxSalary) : undefined,
      jobType,
      jobLocationType,
      postedBy: req.user.id,
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const { title, location, jobType, minSalary, maxSalary, datePosted, page = 1, limit = 10 } = req.query;
    let filter = {};

    if (title) {
      const keywords = title.split(" ").filter(Boolean);
      filter.title = { $regex: keywords.join("|"), $options: "i" };
    }
    if (location) filter.location = { $regex: location, $options: "i" };
    if (jobType) filter.jobType = jobType;
    if (datePosted) filter.createdAt = { $gte: new Date(datePosted) };
    if (minSalary || maxSalary) {
      filter.minSalary = {};
      if (minSalary) filter.minSalary.$gte = Number(minSalary);
      if (maxSalary) filter.maxSalary = { $lte: Number(maxSalary) };
    }

    const skip = (page - 1) * limit;

    const jobs = await Job.find(filter)
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const totalJobs = await Job.countDocuments(filter);

    res.status(200).json({
      jobs,
      totalCount: totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { postJob, getJobs };