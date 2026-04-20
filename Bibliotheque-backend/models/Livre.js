const mongoose = require("mongoose");

const livreSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    auteur: { type: String, required: true },
    etat: { type: String, enum: ["disponible", "emprunté"], default: "disponible" }
});

module.exports = mongoose.model("Livre", livreSchema);