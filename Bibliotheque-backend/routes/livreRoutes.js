const express = require("express");
const router = express.Router();
const Livre = require("../models/Livre");

// GET all books
router.get("/all", async (req, res) => {
    try {
        const livres = await Livre.find();
        res.json(livres);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET one book
router.get("/:id", async (req, res) => {
    try {
        const livre = await Livre.findById(req.params.id);
        if (!livre) return res.status(404).json({ message: "Livre non trouvé" });
        res.json(livre);
    } catch (err) {
        res.status(500).json({ error: "ID invalide" });
    }
});

// POST add book
router.post("/", async (req, res) => {
    try {
        const { titre, auteur } = req.body;

        if (!titre || !auteur) {
            return res.status(400).json({ error: "Titre et auteur sont obligatoires" });
        }

        const livre = new Livre({ titre, auteur });
        await livre.save();

        res.status(201).json({ message: "Livre ajouté avec succès", id: livre._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;