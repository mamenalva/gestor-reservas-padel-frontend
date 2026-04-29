import { Link } from "react-router-dom";
import { isAuthenticated } from "../services/authService";
import "../styles/HomePage.css";

export function HomePage() {
  const autenticado = isAuthenticated();

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>¡Bienvenido al Club de Pádel!</h1>
          <p>Reserva tus pistas favoritas de manera fácil y rápida</p>

          {!autenticado && (
            <div className="hero-buttons">
              <Link to="/login" className="btn btn-primary">
                Iniciar Sesión
              </Link>
              <Link to="/registro" className="btn btn-secondary">
                Registrarse
              </Link>
            </div>
          )}

          {autenticado && (
            <div className="hero-buttons">
              <Link to="/pistas" className="btn btn-primary">
                Ver Pistas
              </Link>
              <Link to="/reservas" className="btn btn-secondary">
                Mis Reservas
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <h3>🏸 Pistas de Calidad</h3>
            <p>Contamos con las mejores pistas de pádel de la ciudad</p>
          </div>

          <div className="feature-card">
            <h3>📅 Reservas Fáciles</h3>
            <p>Reserva tus pistas en solo unos pocos clics</p>
          </div>

          <div className="feature-card">
            <h3>⏰ Horarios Flexibles</h3>
            <p>Múltiples horarios disponibles cada día</p>
          </div>

          <div className="feature-card">
            <h3>👥 Comunidad Activa</h3>
            <p>Únete a una comunidad de amantes del pádel como tú</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2>Horarios de Disponibilidad</h2>
        <div className="schedule">
          <div className="time-slot">17:30 - 19:00</div>
          <div className="time-slot">19:00 - 20:30</div>
          <div className="time-slot">20:30 - 22:00</div>
          <div className="time-slot">22:00 - 23:30</div>
        </div>
      </section>
    </div>
  );
}
