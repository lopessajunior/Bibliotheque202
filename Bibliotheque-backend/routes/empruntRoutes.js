const express = require("express");
const router = express.Router();
const Emprunt = require("../models/Emprunt");
const Livre = require("../models/Livre");

// POST create borrow
router.post("/", async (req, res) => {
    try {
        const { emailClient, idLivre, dateRetour } = req.body;

        if (!emailClient || !idLivre || !dateRetour) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires" });
        }

        const livre = await Livre.findById(idLivre);
        if (!livre) return res.status(404).json({ message: "Livre non trouvé" });

        if (livre.etat === "emprunté") {
            return res.status(400).json({ error: "Le livre est déjà emprunté" });
        }

        const emprunt = new Emprunt({ emailClient, idLivre, dateRetour });
        await emprunt.save();

        livre.etat = "emprunté";
        await livre.save();

        res.status(201).json({ message: "Emprunt créé avec succès", id: emprunt._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET borrows by client email
router.get("/:idClient", async (req, res) => {
    try {
        const emprunts = await Emprunt.find({ emailClient: req.params.idClient }).populate("idLivre");
        res.json(emprunts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT return book
router.put("/:id/return", async (req, res) => {
    try {
        const emprunt = await Emprunt.findById(req.params.id);
        if (!emprunt) return res.status(404).json({ message: "Emprunt non trouvé" });

        if (emprunt.dateRetourEffectue) {
            return res.status(400).json({ error: "Le livre a déjà été retourné" });
        }

        emprunt.dateRetourEffectue = new Date();
        await emprunt.save();

        await Livre.findByIdAndUpdate(emprunt.idLivre, { etat: "disponible" });

        res.json({ message: "Livre retourné avec succès" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;