import { useState, useEffect } from "react";
import { toast } from "sonner";
import { crearReserva } from "../services/reservaService";
import { getPistas } from "../services/pistaService";
import { getUsuario } from "../services/authService";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";

const HORARIOS = [
  { value: "17:30", label: "17:30" },
  { value: "19:00", label: "19:00" },
  { value: "20:30", label: "20:30" },
  { value: "22:00", label: "22:00" },
];

const HORARIOS_FIN = [
  { value: "19:00", label: "19:00" },
  { value: "20:30", label: "20:30" },
  { value: "22:00", label: "22:00" },
  { value: "23:30", label: "23:30" },
];

const FormularioReserva = ({ onGuardado }) => {
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [pistaId, setPistaId] = useState("");
  const [pistas, setPistas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cargarPistas = async () => {
      const data = await getPistas();
      setPistas(data);
    };
    cargarPistas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const usuario = getUsuario();
    const reserva = {
      fecha,
      horaInicio,
      horaFin,
      pistaId: parseInt(pistaId),
      usuarioId: usuario.id,
    };
    await crearReserva(reserva);
    toast.success("Reserva confirmada");
    setLoading(false);
    onGuardado();
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="subtitle1"
          fontWeight={700}
          sx={{ mb: 2.5, color: "#16a34a" }}
        >
          Nueva reserva
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}
        >
          <TextField
            label="Fecha"
            type="date"
            variant="outlined"
            fullWidth
            required
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            disabled={loading}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: new Date().toISOString().split("T")[0] }}
            sx={{
              "& .MuiInputLabel-root": {
                transform: "translate(14px, -9px) scale(0.75)",
              },
            }}
          />

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              select
              label="Hora inicio"
              variant="outlined"
              fullWidth
              required
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              disabled={loading}
            >
              <MenuItem value="">Selecciona</MenuItem>
              {HORARIOS.map((h) => (
                <MenuItem key={h.value} value={h.value}>
                  {h.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Hora fin"
              variant="outlined"
              fullWidth
              required
              value={horaFin}
              onChange={(e) => setHoraFin(e.target.value)}
              disabled={loading}
            >
              <MenuItem value="">Selecciona</MenuItem>
              {HORARIOS_FIN.map((h) => (
                <MenuItem key={h.value} value={h.value}>
                  {h.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <TextField
            select
            label="Pista"
            variant="outlined"
            fullWidth
            required
            value={pistaId}
            onChange={(e) => setPistaId(e.target.value)}
            disabled={loading}
          >
            <MenuItem value="">Selecciona una pista</MenuItem>
            {pistas.map((pista) => (
              <MenuItem key={pista.id} value={pista.id}>
                {pista.nombre} — {pista.ubicacion}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              disabled={loading}
              sx={{
                backgroundColor: "#a3e635",
                color: "#111827",
                fontWeight: 700,
                borderRadius: "50px",
                px: 3.5,
                boxShadow: "0 4px 12px rgba(163,230,53,0.30)",
                "&:hover": { backgroundColor: "#bef264" },
                "&.Mui-disabled": { backgroundColor: "#e5e7eb", color: "#9ca3af", boxShadow: "none" },
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
                  Reservando…
                </>
              ) : (
                "Confirmar reserva"
              )}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FormularioReserva;
