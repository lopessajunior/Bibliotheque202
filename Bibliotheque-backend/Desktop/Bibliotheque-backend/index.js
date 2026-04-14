import express from "express";
import { connectDB } from "./config/database.js";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

let clientsCollection;

// ===== INICIALIZAÇÃO DO BANCO =====
async function initDB() {
    const db = await connectDB();
    clientsCollection = db.collection("clients");
}
await initDB();

// ===== VALIDAÇÃO =====
function validateClient(client) {
    const { firstName, lastName, email, password } = client;

    if (!firstName || !lastName || !email || !password) {
        return "Todos os campos são obrigatórios.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "E-mail inválido.";
    }

    if (password.length < 6) {
        return "A senha deve ter pelo menos 6 caracteres.";
    }

    return null;
}

// ===== CREATE CLIENT =====
app.post("/clients", async (req, res) => {
    try {
        const error = validateClient(req.body);
        if (error) return res.status(400).json({ error });

        const { firstName, lastName, email, password } = req.body;

        // ✅ verificar email único
        const existing = await clientsCollection.findOne({ email });
        if (existing) {
            return res.status(400).json({ error: "Email já existe" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newClient = {
            firstName,
            lastName,
            email,
            password: hashedPassword
        };

        const result = await clientsCollection.insertOne(newClient);

        res.status(201).json({
            message: "Cliente criado com sucesso",
            id: result.insertedId
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== READ ALL CLIENTS =====
app.get("/clients", async (req, res) => {
    try {
        const clients = await clientsCollection.find().toArray();

        // remover password
        const safeClients = clients.map(({ password, ...rest }) => rest);

        res.json(safeClients);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== READ ONE CLIENT =====
app.get("/clients/:id", async (req, res) => {
    try {
        const client = await clientsCollection.findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!client) {
            return res.status(404).json({ message: "Cliente não encontrado" });
        }

        const { password, ...safeClient } = client;

        res.json(safeClient);

    } catch (err) {
        res.status(500).json({ error: "ID inválido" });
    }
});

// ===== UPDATE CLIENT =====
app.put("/clients/:id", async (req, res) => {
    try {
        const error = validateClient(req.body);
        if (error) return res.status(400).json({ error });

        const { firstName, lastName, email, password } = req.body;

        // verificar email duplicado (exceto ele mesmo)
        const existing = await clientsCollection.findOne({ email });
        if (existing && existing._id.toString() !== req.params.id) {
            return res.status(400).json({ error: "Email já existe" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updates = {
            firstName,
            lastName,
            email,
            password: hashedPassword
        };

        const result = await clientsCollection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updates }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Cliente não encontrado" });
        }

        res.json({ message: "Cliente atualizado com sucesso" });

    } catch (err) {
        res.status(500).json({ error: "ID inválido" });
    }
});

// ===== DELETE CLIENT =====
app.delete("/clients/:id", async (req, res) => {
    try {
        const result = await clientsCollection.deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Cliente não encontrado" });
        }

        res.json({ message: "Cliente deletado com sucesso" });

    } catch (err) {
        res.status(500).json({ error: "ID inválido" });
    }
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});