const API = "http://localhost:5000/api/v1";

// Client APIs
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

export const updateClient = async (id, data) => {
    const res = await fetch(`${API}/clients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const deleteClient = async (id) => {
    await fetch(`${API}/clients/${id}`, { method: "DELETE" });
};

// Livre APIs
export const getLivres = async () => {
    const res = await fetch(`${API}/livre/all`);
    return res.json();
};

export const getLivre = async (id) => {
    const res = await fetch(`${API}/livre/${id}`);
    return res.json();
};

export const createLivre = async (data) => {
    const res = await fetch(`${API}/livre`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
};

// Emprunt APIs
export const createEmprunt = async (data) => {
    const res = await fetch(`${API}/emprunt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const getEmpruntsByClient = async (email) => {
    const res = await fetch(`${API}/emprunt/${email}`);
    return res.json();
};

export const returnEmprunt = async (id) => {
    const res = await fetch(`${API}/emprunt/${id}/return`, {
        method: "PUT"
    });
    return res.json();
};