let notes = [];

const getNotes = (req, res) => {
    res.json(notes);
};


// POST /notes
const createNote = (req, res) => {
    const { title, content } = req.body;

    const newNote = {
        id: Date.now().toString(),
        title,
        content,
    };

    notes.push(newNote);
    res.status(201).json(newNote);
};
// POST /notes/server
const createNoteWithServerText = (req, res) => {
    const { title, content } = req.body;

    const newNote = {
        id: Date.now().toString(),
        title: `${title} - This is server added text`,
        content: `${content} - This is server added text`,
    };

    notes.push(newNote);
    res.status(201).json(newNote);
};


// PUT /notes/:id
const updateNote = (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = notes.find((n) => n.id === id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.title = title || note.title;
    note.content = content || note.content;

    res.json(note);
};


// DELETE /notes/:id
const deleteNote = (req, res) => {
    const { id } = req.params;
    notes = notes.filter((n) => n.id !== id);
    res.json({ message: "Note deleted successfully" });
};

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    createNoteWithServerText
};