const router = require("express").Router();
const Snippet = require('../models/snippetModel');

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

router.get("/", async(req, res) => {
    try {
        const snippets = await Snippet.find();
        res.json(snippets);
    } catch(err) {
        res.status(500).send();
    }
})

router.delete("/:id", async(req, res) => {
    try {
        const snippetId = req.params.id;

        if (!snippetId) {
            return res.status(400).json({errorMessage: "snippet id not given"});
        }

        const snippet = await Snippet.findById(snippetId);

        if (!snippet) {
            return res.status(404).json({errorMessage: "can not find snippet"});
        }

        await snippet.delete();
        res.json(snippet);
    } catch(err) {
        res.status(500).send();
    }
});

router.put("/edit/:id", async (req, res) => {
    try {
        const {title, description, code} = req.body;
        const snippetId = req.params.id;

        if (!description || !code) {
            return res.status(400).json({ errorMessage: "missing description and code"});
        }

        if (!snippetId) {
            return res.status(400).json({errorMessage: "snippet id not given"});
        }

        const snippet = await Snippet.findById(snippetId);

        if (!snippet) {
            return res.status(404).json({errorMessage: "can not find snippet"});
        }

        snippet.title = title;
        snippet.description = description;
        snippet.code = code;

        const saveSnippet = await snippet.save();
        
        res.json(saveSnippet);
    } catch(err) {
        err.status(500).send();
    }
})

module.exports = router;