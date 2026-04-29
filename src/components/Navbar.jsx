import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, getUsuario, logout } from "../services/authService";
import "../styles/Navbar.css";

export function Navbar() {
  const navigate = useNavigate();
  const usuario = getUsuario();
  const autenticado = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🏸 Pádel Club
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Inicio
          </Link>

          {autenticado ? (
            <>
              <Link to="/pistas" className="nav-link">
                Pistas
              </Link>
              <Link to="/reservas" className="nav-link">
                Reservas
              </Link>
              <span className="nav-user">Hola, {usuario?.nombre}</span>
              <button onClick={handleLogout} className="btn-logout">
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Iniciar sesión
              </Link>
              <Link to="/registro" className="btn-registro">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
