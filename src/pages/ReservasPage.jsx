import ListadoReservas from "../components/ListadoReservas";
import "../styles/Pages.css";

export function ReservasPage() {
    return (
        <div className="page-container">
            <h1>Gestión de Reservas</h1>
            <ListadoReservas />
        </div>
    );
}
