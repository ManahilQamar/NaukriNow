const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation
} = require("../controllers/education.controller");

router.get("/", protect, getEducation);
router.post("/", protect, addEducation);
router.put("/:id", protect, updateEducation);
router.delete("/:id", protect, deleteEducation);

module.exports = router;