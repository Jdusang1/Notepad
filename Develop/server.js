const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));



// targets /notes and joins to notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
// targets * and joins to index.html

app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", function (err, data) {
        if (err) {
            throw err;
        }
        res.json(JSON.parse(data))
    })
});

app.post("/api/notes", function (req, res) {
    const note = req.body;
    fs.readFile("db/db.json", function (err, data) {
        if (err) throw err
        const notes = JSON.parse(data)
        note.id = notes.length
        notes.push(note)
        console.log(notes)

        fs.writeFile("db/db.json", JSON.stringify(notes), function (err) {
            if (err) throw err
            res.json(note)
        })
    })
});

app.delete("/api/notes/:id", function (req, res) {
    const id = parseInt(req.params.id);

    fs.readFile("db/db.json", function (err, data) {
        if (err) throw err
        const notes = JSON.parse(data)
        console.log(notes[id])


        fs.writeFile("db/db.json", JSON.stringify(notes), function (err) {
            if (err) throw err

        })
    })
    console.log(req.params.id)
})



// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.




app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function () {
    console.log("App listening on Port " + PORT)
});