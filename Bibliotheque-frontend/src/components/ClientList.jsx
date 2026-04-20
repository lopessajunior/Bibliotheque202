function ClientList({ clients, onDelete, onEdit }) {
    return (
        <div>
            {clients.map((c) => (
                <div key={c._id} style={{ marginBottom: "10px" }}>
                    <strong>{c.firstName} {c.lastName}</strong>
                    {" - "}{c.email}
                    <button onClick={() => onEdit(c)} style={{ marginLeft: "10px" }}>
                        Modifier
                    </button>
                    <button onClick={() => onDelete(c._id)} style={{ marginLeft: "10px" }}>
                        Supprimer
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ClientList;