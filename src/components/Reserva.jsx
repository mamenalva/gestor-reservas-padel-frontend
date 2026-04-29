const Reserva = ({ reserva, onEliminar }) => {
  return (
    <div>
      <p>Fecha: {reserva.fecha}</p>
      <p>Hora inicio: {reserva.horaInicio}</p>
      <p>Hora fin: {reserva.horaFin}</p>
      <p>Pista ID: {reserva.pistaId}</p>
      <button onClick={() => onEliminar(reserva.id)}>Cancelar reserva</button>
    </div>
  );
};

export default Reserva;
