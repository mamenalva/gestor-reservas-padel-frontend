import { useState, useEffect } from "react";
import { crearPista, actualizarPista } from "../services/pistaService";

const FormularioPista = ({ pistaEditando, onGuardado }) => {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [disponible, setDisponible] = useState(true);

  useEffect(() => {
    if (pistaEditando) {
      setNombre(pistaEditando.nombre);
      setUbicacion(pistaEditando.ubicacion);
      setDisponible(pistaEditando.disponible);
    }
  }, [pistaEditando]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pista = { nombre, ubicacion, disponible };

    if (pistaEditando) {
      await actualizarPista(pistaEditando.id, pista);
    } else {
      await crearPista(pista);
    }

    onGuardado();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Ubicación:</label>
        <input
          type="text"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Disponible:</label>
        <input
          type="checkbox"
          checked={disponible}
          onChange={(e) => setDisponible(e.target.checked)}
        />
      </div>
      <button type="submit">{pistaEditando ? "Actualizar" : "Crear"}</button>
    </form>
  );
};

export default FormularioPista;
