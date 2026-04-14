import { useEffect, useState } from "react";

function ClientForm({ onCreate, editing }) {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    // preencher quando estiver editando
    useEffect(() => {
        if (editing) {
            setForm({
                firstName: editing.firstName || "",
                lastName: editing.lastName || "",
                email: editing.email || "",
                password: ""
            });
        }
    }, [editing]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(form);

        setForm({
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Prénom"
                value={form.firstName}
                onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                }
            />

            <input
                placeholder="Nom de famille"
                value={form.lastName}
                onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                }
            />

            <input
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                }
            />

            <input
                type="password"
                placeholder="Mots de passe"
                value={form.password}
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
            />

            <button type="submit">
                {editing ? "Actualize" : "Create"}
            </button>
        </form>
    );
}

export default ClientForm;