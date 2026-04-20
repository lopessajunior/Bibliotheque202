const mongoose = require("mongoose");

const empruntSchema = new mongoose.Schema({
    emailClient: { type: String, required: true },
    idLivre: { type: mongoose.Schema.Types.ObjectId, ref: "Livre", required: true },
    dateEmprunt: { type: Date, default: Date.now },
    dateRetour: { type: Date, required: true },
    dateRetourEffectue: { type: Date, default: null }
});

module.exports = mongoose.model("Emprunt", empruntSchema);