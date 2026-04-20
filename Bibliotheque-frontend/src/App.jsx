import { useState } from "react";
import Clients from "./pages/Clients";
import Livres from "./pages/Livres";

function App() {
    const [page, setPage] = useState("clients");

    return (
        <div>
            <nav style={{ padding: "10px", background: "#f0f0f0" }}>
                <button onClick={() => setPage("clients")}>Clients</button>
                <button onClick={() => setPage("livres")} style={{ marginLeft: "10px" }}>Livres</button>
            </nav>
            {page === "clients" ? <Clients /> : <Livres />}
        </div>
    );
}

export default App;