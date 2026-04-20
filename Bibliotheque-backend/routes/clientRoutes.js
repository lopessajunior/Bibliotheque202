const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Client = require("../models/Client");

// GET all clients
router.get("/", async (req, res) => {
    try {
        const clients = await Client.find().select("-password");
        res.json(clients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET one client
router.get("/:id", async (req, res) => {
    try {
        const client = await Client.findById(req.params.id).select("-password");
        if (!client) return res.status(404).json({ message: "Client non trouvé" });
        res.json(client);
    } catch (err) {
        res.status(500).json({ error: "ID invalide" });
    }
});

// POST create client
router.post("/", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Email invalide" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Le mot de passe doit contenir au moins 6 caractères" });
        }

        const existing = await Client.findOne({ email });
        if (existing) {
            return res.status(400).json({ error: "L'email existe déjà" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const client = new Client({ firstName, lastName, email, password: hashedPassword });
        await client.save();

        res.status(201).json({ message: "Client créé avec succès", id: client._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update client
router.put("/:id", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Email invalide" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Le mot de passe doit contenir au moins 6 caractères" });
        }

        const existing = await Client.findOne({ email });
        if (existing && existing._id.toString() !== req.params.id) {
            return res.status(400).json({ error: "L'email existe déjà" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const client = await Client.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, email, password: hashedPassword },
            { new: true }
        );

        if (!client) return res.status(404).json({ message: "Client non trouvé" });

        res.json({ message: "Client mis à jour avec succès" });
    } catch (err) {
        res.status(500).json({ error: "ID invalide" });
    }
});

// DELETE client
router.delete("/:id", async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) return res.status(404).json({ message: "Client non trouvé" });
        res.json({ message: "Client supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ error: "ID invalide" });
    }
});

module.exports = router;