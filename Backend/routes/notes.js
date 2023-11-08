const express = require("express");
const fetchUser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Note = require("../models/Note");

// Router 1 : Fetch all notes for a user using GET "/api/notes/fetchallnotes" | Login Required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Router 2 : Save notes for a user using POST "/api/notes/saveNotes" | Login Required
router.post(
  "/savenotes",
  fetchUser,
  [
    body("title", "Title can not be less then 3 characters").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description can not be less then 3 characters"
    ).isLength({ min: 3 }),
  ],
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { title, description, tag } = req.body;
    const note = new Note({
      title,
      description,
      tag,
      userId: req.user.id,
    });
    try {
      const savedNote = await note.save();
      res.status(200).json(savedNote);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Router 3 : update note for a user using PUT "/api/notes/updateNote" | Login Required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote = {};

  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  // Find the note to update and update it.

  // Verify for the user i.e. the user updating the note and notes user are same.
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.userId.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Find and update the note
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.status(200).json(updatedNote);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Router 4 : Delete note for a user using DELETE "/api/notes/deletenote" | Login Required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  // Find the note to delete and delete it.

  // Verify for the user i.e. the user deleting the note and notes user are same.
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.userId.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Find and Delete the note
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    res.status(200).json({ Success: "Note deleted successfully", deletedNote });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
