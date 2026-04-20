import { useEffect, useState } from "react";
import ClientForm from "../components/ClientForm";
import ClientList from "../components/ClientList";
import {
    getClients,
    createClient,
    deleteClient,
    updateClient
} from "../services/api";

function Clients() {
    const [clients, setClients] = useState([]);
    const [editing, setEditing] = useState(null);
    const [error, setError] = useState("");

    const loadClients = async () => {
        const data = await getClients();
        setClients(data);
    };

    useEffect(() => {
        loadClients();
    }, []);

    const handleCreate = async (data) => {
        setError("");
        const result = await createClient(data);
        if (result.error) {
            setError(result.error);
            return;
        }
        loadClients();
    };

    const handleUpdate = async (data) => {
        setError("");
        const result = await updateClient(editing._id, data);
        if (result.error) {
            setError(result.error);
            return;
        }
        setEditing(null);
        loadClients();
    };

    const handleDelete = async (id) => {
        await deleteClient(id);
        loadClients();
    };

    const handleEdit = (client) => {
        setEditing(client);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>📚 Bibliothèque - Clients</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ClientForm
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                editing={editing}
            />

            <hr />

            <ClientList
                clients={clients}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </div>
    );
}

export default Clients;