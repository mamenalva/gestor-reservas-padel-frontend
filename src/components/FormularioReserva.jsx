import { useState, useEffect } from "react";
import { crearReserva } from "../services/reservaService";
import { getPistas } from "../services/pistaService";
import { getUsuario } from "../services/authService";

const FormularioReserva = ({ onGuardado }) => {
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [pistaId, setPistaId] = useState("");
  const [pistas, setPistas] = useState([]);

  useEffect(() => {
    const cargarPistas = async () => {
      const data = await getPistas();
      setPistas(data);
    };
    cargarPistas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuario = getUsuario();
    const reserva = {
      fecha,
      horaInicio,
      horaFin,
      pistaId: parseInt(pistaId),
      usuarioId: usuario.id,
    };
    await crearReserva(reserva);
    onGuardado();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Hora inicio:</label>
        <input
          type="time"
          value={horaInicio}
          onChange={(e) => setHoraInicio(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Hora fin:</label>
        <input
          type="time"
          value={horaFin}
          onChange={(e) => setHoraFin(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Pista:</label>
        <select
          value={pistaId}
          onChange={(e) => setPistaId(e.target.value)}
          required
        >
          <option value="">Selecciona una pista</option>
          {pistas.map((pista) => (
            <option key={pista.id} value={pista.id}>
              {pista.nombre} - {pista.ubicacion}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Reservar</button>
    </form>
  );
};

export default FormularioReserva;
