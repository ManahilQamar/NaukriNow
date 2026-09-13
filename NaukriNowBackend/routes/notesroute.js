// routes/notesRoutes.js

const express = require("express");
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  createNoteWithServerText
} = require("../controllers/notescontrollers");

// Route Definitions
router.get("/", getNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
router.post("/with-server-text", createNoteWithServerText);

module.exports = router;
