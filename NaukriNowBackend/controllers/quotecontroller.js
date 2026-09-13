const Quote = require("../models/Quote");

const quotesarray = [
    "The only limit to our realization of tomorrow is our doubts of today.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "The future belongs to those who believe in the beauty of their movies.",
    "It does not matter how slowly you go as long as you do not stop.",
    "Success is not final  failure is not fatal: It is the courage to continue that counts.",
    "Believe you can and you're halfway there."
];

const seedQuotes = async () => {
    try {
        for (const text of quotesarray) {
            const exists = await Quote.findOne({ text });
            if (!exists) {
                await Quote.create({ text });
                console.log(`Quote added: "${text}"`);
            } else {
                console.log(`Quote already exists: "${text}"`);
            }
        }
    } catch (err) {
        console.error("Error seeding quotes:", err);
    }
};


const getRandomQuote = async (req, res) => {
    try {
        const count = await Quote.countDocuments();
        const random = Math.floor(Math.random() * count);
        const quote = await Quote.findOne().skip(random);
        res.json({ quote });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

const addQuote = async (req, res) => {
    const { text, author } = req.body;
    if (!text) return res.status(400).json({ error: "Quote text is required" });

    try {
        const newQuote = new Quote({ text, author });
        await newQuote.save();
        res.status(201).json({ message: "Quote added", quote: newQuote });
    } catch (err) {
        res.status(500).json({ error: "Failed to add quote" });
    }
};


const updateQuote = async (req, res) => {
    const { id } = req.params;
    const { text, author } = req.body;

    try {
        const updatedQuote = await Quote.findByIdAndUpdate(
            id,
            { text, author },
            { new: true }
        );
        if (!updatedQuote) return res.status(404).json({ error: "Quote not found" });
        res.json({ message: "Quote updated", quote: updatedQuote });
    } catch (err) {
        res.status(500).json({ error: "Failed to update quote" });
    }
};
const deleteQuote = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedQuote = await Quote.findByIdAndDelete(id);
        if (!deletedQuote) return res.status(404).json({ error: "Quote not found" });
        res.json({ message: "Quote deleted", quote: deletedQuote });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete quote" });
    }
};



module.exports = {seedQuotes, getRandomQuote , addQuote, updateQuote, deleteQuote };