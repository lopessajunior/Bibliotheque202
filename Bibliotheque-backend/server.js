require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const clientRoutes = require("./routes/clientRoutes");
const livreRoutes = require("./routes/livreRoutes");
const empruntRoutes = require("./routes/empruntRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bibliotheque")
    .then(() => console.log("✅ Connecté au MongoDB"))
    .catch(err => console.error("❌ Erreur de connexion:", err));

app.use("/api/v1/clients", clientRoutes);
app.use("/api/v1/livre", livreRoutes);
app.use("/api/v1/emprunt", empruntRoutes);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});