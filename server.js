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
        note.id = notes.length + 1
        notes.push(note)
        // console.log(notes)

        fs.writeFile("db/db.json", JSON.stringify(notes), function (err) {
            if (err) throw err
            res.json(note)
        })
    })
});

app.delete("/api/notes/:id", function (req, res) {
    const id = parseInt(req.params.id) - 1;

    fs.readFile("db/db.json", function (err, data) {
        if (err) throw err
        const notes = JSON.parse(data)
        // console.log(notes[id])
        notes.splice(id, 1)
        notes.forEach(function (item, index) {
            item.id = index

        })



        fs.writeFile("db/db.json", JSON.stringify(notes), function (err) {
            if (err) throw err
            res.send(true)

        })
    })
    // console.log(req.params.id)
})

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function () {
    console.log("App listening on Port " + PORT)
});