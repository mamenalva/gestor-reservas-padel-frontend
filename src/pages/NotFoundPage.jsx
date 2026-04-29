import { Link } from "react-router-dom";
import "../styles/NotFound.css";

export function NotFoundPage() {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1>404</h1>
                <h2>Página no encontrada</h2>
                <p>Lo sentimos, la página que buscas no existe.</p>
                <Link to="/" className="btn-home">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}
