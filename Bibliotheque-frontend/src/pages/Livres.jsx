import { useEffect, useState } from "react";
import {
    getLivres,
    createLivre,
    createEmprunt,
    getEmpruntsByClient,
    returnEmprunt
} from "../services/api";

function Livres() {
    const [livres, setLivres] = useState([]);
    const [emprunts, setEmprunts] = useState([]);
    const [form, setForm] = useState({ titre: "", auteur: "" });
    const [empruntForm, setEmpruntForm] = useState({ emailClient: "", idLivre: "" });
    const [error, setError] = useState("");

    useEffect(() => {
        loadLivres();
    }, []);

    const loadLivres = async () => {
        const data = await getLivres();
        setLivres(data);
    };

    const loadEmprunts = async (email) => {
        const data = await getEmpruntsByClient(email);
        setEmprunts(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const result = await createLivre(form);
        if (result.error) {
            setError(result.error);
            return;
        }
        setForm({ titre: "", auteur: "" });
        loadLivres();
    };

    const handleEmprunt = async (e) => {
        e.preventDefault();
        setError("");
        const result = await createEmprunt(empruntForm);
        if (result.error) {
            setError(result.error);
            return;
        }
        setEmpruntForm({ emailClient: "", idLivre: "" });
        loadLivres();
    };

    const handleReturn = async (empruntId) => {
        setError("");
        const result = await returnEmprunt(empruntId);
        if (result.error) {
            setError(result.error);
            return;
        }
        loadLivres();
        if (empruntForm.emailClient) {
            loadEmprunts(empruntForm.emailClient);
        }
    };

    const handleEmailChange = (email) => {
        setEmpruntForm({ ...empruntForm, emailClient: email });
        if (email) {
            loadEmprunts(email);
        } else {
            setEmprunts([]);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>📚 Bibliothèque - Livres</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <h2>Ajouter un livre</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Titre"
                    value={form.titre}
                    onChange={(e) => setForm({ ...form, titre: e.target.value })}
                />
                <input
                    placeholder="Auteur"
                    value={form.auteur}
                    onChange={(e) => setForm({ ...form, auteur: e.target.value })}
                />
                <button type="submit">Ajouter</button>
            </form>

            <h2>Emprunter un livre</h2>
            <form onSubmit={handleEmprunt}>
                <input
                    placeholder="Email du client"
                    value={empruntForm.emailClient}
                    onChange={(e) => handleEmailChange(e.target.value)}
                />
                <select
                    value={empruntForm.idLivre}
                    onChange={(e) => setEmpruntForm({ ...empruntForm, idLivre: e.target.value })}
                >
                    <option value="">Sélectionner un livre</option>
                    {livres.filter(l => l.etat === "disponible").map(livre => (
                        <option key={livre._id} value={livre._id}>
                            {livre.titre} - {livre.auteur}
                        </option>
                    ))}
                </select>
                <button type="submit">Emprunter</button>
            </form>

            {emprunts.length > 0 && (
                <div>
                    <h3>Emprunts de {empruntForm.emailClient}</h3>
                    {emprunts.map(emp => (
                        <div key={emp._id} style={{ marginBottom: "10px", border: "1px solid #ccc", padding: "10px" }}>
                            <strong>{emp.idLivre?.titre}</strong> par {emp.idLivre?.auteur}
                            <br />
                            Date emprunt: {new Date(emp.dateEmprunt).toLocaleDateString()}
                            <br />
                            Date retour prévue: {new Date(emp.dateRetour).toLocaleDateString()}
                            {emp.dateRetourEffectue ? (
                                <span style={{ color: "green" }}> - Retourné le {new Date(emp.dateRetourEffectue).toLocaleDateString()}</span>
                            ) : (
                                <button onClick={() => handleReturn(emp._id)} style={{ marginLeft: "10px" }}>
                                    Retourner
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <h2>Inventaire</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Auteur</th>
                        <th>État</th>
                    </tr>
                </thead>
                <tbody>
                    {livres.map(livre => (
                        <tr key={livre._id}>
                            <td>{livre.titre}</td>
                            <td>{livre.auteur}</td>
                            <td>
                                <span style={{ color: livre.etat === "disponible" ? "green" : "orange" }}>
                                    {livre.etat}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Livres;