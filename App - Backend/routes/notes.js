const express = require("express");
const noteRouter = express.Router();
const NoteModel = require("../models/NoteModel");
const fetchUser = require("../middlewares/fetchUser");
const { body, validationResult } = require('express-validator');

// ROUTE :1 :: Fetch All Notes of User using : GET "/api/notes/fetchNotes" . Login Required
noteRouter.get("/fetchNotes", fetchUser, async (req, res) => {
    try {
        const notes = await NoteModel.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE :2 :: Add a New Note for User using : POST "/api/notes/addNote" . Login Required
noteRouter.post("/addNote", fetchUser, [
    body('title', 'Enter a Valid Title of Lenght at least 3').isLength({ min: 3 }),
    body('description', 'Description Lenght should be atleast 5').isLength({ min: 5 })], async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            // Validation Checks and Returning Bad request and the errors
            const result = validationResult(req);
            if (!result.isEmpty()) {
                res.status(400).send({ errors: result.array() });
            }

            const note = new NoteModel({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();
            res.json(savedNote);

        } catch (error) {
            console.error(error.message);
            res.status(500).send(" Some Internal Server Error Occured ! We Will Get Back to you very soon");
        }
    })

module.exports = noteRouter;