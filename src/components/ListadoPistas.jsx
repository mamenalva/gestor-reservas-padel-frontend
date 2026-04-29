import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getPistas, eliminarPista } from "../services/pistaService";
import Pista from "./Pista";
import FormularioPista from "./FormularioPista";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const ListadoPistas = () => {
  const [pistas, setPistas] = useState([]);
  const [pistaEditando, setPistaEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargando, setCargando] = useState(true);

  // Carga inicial: setState dentro del .then(), no en el cuerpo del efecto
  useEffect(() => {
    getPistas().then((data) => {
      setPistas(data);
      setCargando(false);
    });
  }, []);

  const refrescar = () => {
    getPistas().then((data) => setPistas(data));
  };

  const handleEliminar = async (id) => {
    await eliminarPista(id);
    toast.success("Pista eliminada");
    refrescar();
  };

  const handleEditar = (pista) => {
    setPistaEditando(pista);
    setMostrarFormulario(true);
  };

  const handleGuardado = () => {
    setPistaEditando(null);
    setMostrarFormulario(false);
    refrescar();
  };

  const handleCancelar = () => {
    setPistaEditando(null);
    setMostrarFormulario(false);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button
          onClick={() => {
            setPistaEditando(null);
            setMostrarFormulario(!mostrarFormulario);
          }}
          sx={
            mostrarFormulario
              ? {
                  borderRadius: "50px",
                  border: "1.5px solid #e5e7eb",
                  color: "#111827",
                  px: 3,
                  "&:hover": { bgcolor: "#f8fafc", borderColor: "#d1d5db" },
                }
              : {
                  backgroundColor: "#a3e635",
                  color: "#111827",
                  fontWeight: 700,
                  borderRadius: "50px",
                  px: 3,
                  boxShadow: "0 4px 14px rgba(163,230,53,0.35)",
                  "&:hover": { backgroundColor: "#bef264" },
                }
          }
        >
          {mostrarFormulario ? "Cancelar" : "+ Nueva Pista"}
        </Button>
      </Box>

      {mostrarFormulario && (
        <FormularioPista
          pistaEditando={pistaEditando}
          onGuardado={handleGuardado}
          onCancelar={handleCancelar}
        />
      )}

      {cargando ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : pistas.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" sx={{ py: 6 }}>
          No hay pistas registradas todavía.
        </Typography>
      ) : (
        pistas.map((pista) => (
          <Pista
            key={pista.id}
            pista={pista}
            onEliminar={handleEliminar}
            onEditar={handleEditar}
          />
        ))
      )}
    </Box>
  );
};

export default ListadoPistas;
