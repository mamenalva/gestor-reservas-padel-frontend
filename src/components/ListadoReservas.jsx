import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getReservas, eliminarReserva } from "../services/reservaService";
import Reserva from "./Reserva";
import FormularioReserva from "./FormularioReserva";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const ListadoReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargando, setCargando] = useState(true);

  // Carga inicial: setState dentro del .then(), no en el cuerpo del efecto
  useEffect(() => {
    getReservas().then((data) => {
      setReservas(data);
      setCargando(false);
    });
  }, []);

  const refrescar = () => {
    getReservas().then((data) => setReservas(data));
  };

  const handleEliminar = async (id) => {
    await eliminarReserva(id);
    toast.success("Reserva cancelada");
    refrescar();
  };

  const handleGuardado = () => {
    setMostrarFormulario(false);
    refrescar();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
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
          {mostrarFormulario ? "Cancelar" : "+ Nueva Reserva"}
        </Button>
      </Box>

      {mostrarFormulario && (
        <FormularioReserva onGuardado={handleGuardado} />
      )}

      {cargando ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : reservas.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" sx={{ py: 6 }}>
          No tienes reservas todavía.
        </Typography>
      ) : (
        reservas.map((reserva) => (
          <Reserva
            key={reserva.id}
            reserva={reserva}
            onEliminar={handleEliminar}
          />
        ))
      )}
    </Box>
  );
};

export default ListadoReservas;
