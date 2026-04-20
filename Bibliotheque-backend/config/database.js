const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

let dbInstance = null;

async function connectDB() {
    try {
        if (!dbInstance) {
            await client.connect();
            dbInstance = client.db("bibliotheque");
            console.log("✅ Connecté au MongoDB");
        }
        return dbInstance;
    } catch (err) {
        console.error("❌ Erreur de connexion:", err);
        throw err;
    }
}

module.exports = { connectDB };