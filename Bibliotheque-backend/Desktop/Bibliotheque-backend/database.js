import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017"; // altere se usar Atlas
const client = new MongoClient(uri);

let dbInstance = null;

export async function connectDB() {
    try {
        if (!dbInstance) {
            await client.connect();
            dbInstance = client.db("biblioteca"); // nome do seu banco
            console.log("✅ Conectado ao MongoDB");
        }
        return dbInstance;
    } catch (err) {
        console.error("❌ Erro ao conectar ao MongoDB:", err);
        throw err;
    }
}
// config/database.js