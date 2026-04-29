import ListadoPistas from "../components/ListadoPistas";
import "../styles/Pages.css";

export function PistasPage() {
    return (
        <div className="page-container">
            <h1>Gestión de Pistas</h1>
            <ListadoPistas />
        </div>
    );
}
