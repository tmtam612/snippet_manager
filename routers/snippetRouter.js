const router = require("express").Router();
const Snippet = require('../models/snippetModel');
router.get("/test", (req, res) => {
    res.send('Router test');
})

router.post('/add', async (req, res) => {
    try {
        const {title, description, code} = req.body;
    
        if (!description || !code) {
            return res.status(400).json({ errorMessage: "missing description and code"});
        }
        const snippet = new Snippet({
            title, description, code
        });
        const savedSnippet = await snippet.save();
        res.json(savedSnippet);
    } catch (err) {
        res.status(500).send();
    }
    

    res.send(snippet.save());
});
module.exports = router;