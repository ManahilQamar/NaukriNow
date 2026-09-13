const express = require("express");
const router = express.Router();
const {
    getRandomQuote,
    addQuote,
    updateQuote,
    seedQuotes
} = require("../controllers/quotecontroller");

router.get('/', getRandomQuote);
router.post('/add', addQuote);
router.put('/edit/:id', updateQuote);

module.exports = router;
