const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

// Database
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/auth.routes.js");
const notesRoutes = require("./routes/notesroute.js");
const quotesRoutes = require("./routes/quotesrouter.js");
const jobRoutes = require("./routes/job.routes.js");
const ContactRoutes = require("./routes/contact.routes.js");
const ResumeRoutes = require("./routes/resume.routes.js");
const addressRoutes = require("./routes/address.routes.js");
const educationRoutes = require("./routes/education.routes.js");
const jobApplicationRoutes = require("./routes/jobApplication.routes.js");
const employerRoutes = require("./routes/employer.routes.js");





// Load .env and connect to DB
dotenv.config();
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

// ✅ uploads folder ko public access dena
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route middleware
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/quotes", quotesRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/contact", ContactRoutes);
app.use("/api/resume", ResumeRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/jobapplications", jobApplicationRoutes);
app.use("/api/employer", employerRoutes);

// Default PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
