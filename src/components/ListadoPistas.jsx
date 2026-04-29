import { useEffect, useState } from "react";
import { getPistas, eliminarPista } from "../services/pistaService";
import Pista from "./Pista";
import FormularioPista from "./FormularioPista";

const ListadoPistas = () => {
  const [pistas, setPistas] = useState([]);
  const [pistaEditando, setPistaEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const cargarPistas = async () => {
    const data = await getPistas();
    setPistas(data);
  };

  useEffect(() => {
    cargarPistas();
  }, []);

  const handleEliminar = async (id) => {
    await eliminarPista(id);
    cargarPistas();
  };

  const handleEditar = (pista) => {
    setPistaEditando(pista);
    setMostrarFormulario(true);
  };

  const handleGuardado = () => {
    setPistaEditando(null);
    setMostrarFormulario(false);
    cargarPistas();
  };

  return (
    <div>
      <h2>Pistas de Pádel</h2>
      <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        {mostrarFormulario ? "Cancelar" : "Nueva Pista"}
      </button>
      {mostrarFormulario && (
        <FormularioPista
          pistaEditando={pistaEditando}
          onGuardado={handleGuardado}
        />
      )}
      {pistas.map((pista) => (
        <Pista
          key={pista.id}
          pista={pista}
          onEliminar={handleEliminar}
          onEditar={handleEditar}
        />
      ))}
    </div>
  );
};

export default ListadoPistas;
