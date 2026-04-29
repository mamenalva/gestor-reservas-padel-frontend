import { useEffect, useState } from "react";
import { getReservas, eliminarReserva } from "../services/reservaService";
import Reserva from "./Reserva";
import FormularioReserva from "./FormularioReserva";

const ListadoReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const cargarReservas = async () => {
    const data = await getReservas();
    setReservas(data);
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  const handleEliminar = async (id) => {
    await eliminarReserva(id);
    cargarReservas();
  };

  const handleGuardado = () => {
    setMostrarFormulario(false);
    cargarReservas();
  };

  return (
    <div>
      <h2>Mis Reservas</h2>
      <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        {mostrarFormulario ? "Cancelar" : "Nueva Reserva"}
      </button>
      {mostrarFormulario && <FormularioReserva onGuardado={handleGuardado} />}
      {reservas.map((reserva) => (
        <Reserva
          key={reserva.id}
          reserva={reserva}
          onEliminar={handleEliminar}
        />
      ))}
    </div>
  );
};

export default ListadoReservas;
