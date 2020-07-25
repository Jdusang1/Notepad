const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const getNotes = [];
const saveNote = [];
const deleteNote = [];

// targets /notes and joins to notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});
// targets * and joins to index.html
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/notes", function (req, res) {




});