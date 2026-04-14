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

    const loadClients = async () => {
        const data = await getClients();
        setClients(data);
    };

    useEffect(() => {
        loadClients();
    }, []);

    const handleCreate = async (data) => {
        if (editing) {
            await updateClient(editing._id, data);
            setEditing(null);
        } else {
            await createClient(data);
        }

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
            <h1>📚Bibliotheque </h1>

            <ClientForm
                onCreate={handleCreate}
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