import { useEffect, useState } from "react";

function ClientForm({ onCreate, onUpdate, editing }) {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        if (editing) {
            setForm({
                firstName: editing.firstName || "",
                lastName: editing.lastName || "",
                email: editing.email || "",
                password: ""
            });
        } else {
            setForm({ firstName: "", lastName: "", email: "", password: "" });
        }
    }, [editing]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editing) {
            onUpdate(form);
        } else {
            onCreate(form);
        }
        setForm({ firstName: "", lastName: "", email: "", password: "" });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Prénom"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
            <input
                placeholder="Nom de famille"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
            <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="submit">
                {editing ? "Actualiser" : "Créer"}
            </button>
            {editing && (
                <button type="button" onClick={() => setForm({ firstName: "", lastName: "", email: "", password: "" })}>
                    Annuler
                </button>
            )}
        </form>
    );
}

export default ClientForm;