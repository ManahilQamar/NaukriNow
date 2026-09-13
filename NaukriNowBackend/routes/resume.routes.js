const express = require("express");
const multer = require("multer");
const path = require("path");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedExt = /\.(pdf|docx?|rtf|txt)$/i;
    if (!allowedExt.test(file.originalname)) {
      return cb(new Error("Invalid file type. Only PDF, DOC, DOCX, RTF, TXT allowed."));
    }
    cb(null, true);
  },
});

router.post("/upload-resume", protect, upload.single("resume"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({
    message: "Resume uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
}, (err, req, res, next) => {
  // Multer error handler (file type/size fail hone par)
  res.status(400).json({ message: err.message });
});

module.exports = router;