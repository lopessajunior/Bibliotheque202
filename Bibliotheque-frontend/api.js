const API = "http://localhost:3000";

export const getClients = async () => {
    const res = await fetch(`${API}/clients`);
    return res.json();
};

export const createClient = async (data) => {
    const res = await fetch(`${API}/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return res.json();
};

export const deleteClient = async (id) => {
    await fetch(`${API}/clients/${id}`, {
        method: "DELETE"
    });
};

export const updateClient = async (id, data) => {
    await fetch(`${API}/clients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
};