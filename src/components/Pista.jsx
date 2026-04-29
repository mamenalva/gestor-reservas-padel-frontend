const Pista = ({ pista, onEliminar, onEditar }) => {
  return (
    <div>
      <h3>{pista.nombre}</h3>
      <p>Ubicación: {pista.ubicacion}</p>
      <p>Disponible: {pista.disponible ? "Sí" : "No"}</p>
      <button onClick={() => onEditar(pista)}>Editar</button>
      <button onClick={() => onEliminar(pista.id)}>Eliminar</button>
    </div>
  );
};

export default Pista;
