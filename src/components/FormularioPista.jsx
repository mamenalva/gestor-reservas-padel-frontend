import { useState } from "react";
import { toast } from "sonner";
import { crearPista, actualizarPista } from "../services/pistaService";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";

const FormularioPista = ({ pistaEditando, onGuardado, onCancelar }) => {
  const [nombre, setNombre] = useState(pistaEditando?.nombre || "");
  const [ubicacion, setUbicacion] = useState(pistaEditando?.ubicacion || "");
  const [disponible, setDisponible] = useState(pistaEditando?.disponible ?? true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const pista = { nombre, ubicacion, disponible };

    if (pistaEditando) {
      await actualizarPista(pistaEditando.id, pista);
      toast.success("Pista actualizada correctamente");
    } else {
      await crearPista(pista);
      toast.success("Pista creada correctamente");
    }

    setLoading(false);
    onGuardado();
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2.5, color: "#16a34a" }}>
          {pistaEditando ? "Editar pista" : "Nueva pista"}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={loading}
            placeholder="Ej. Pista 1"
          />

          <TextField
            label="Ubicación"
            variant="outlined"
            fullWidth
            required
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            disabled={loading}
            placeholder="Ej. Zona Norte"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={disponible}
                onChange={(e) => setDisponible(e.target.checked)}
                disabled={loading}
                sx={{ color: "#16a34a", "&.Mui-checked": { color: "#16a34a" } }}
              />
            }
            label="Disponible"
          />

          <Box sx={{ display: "flex", gap: 1.5, justifyContent: "flex-end" }}>
            {onCancelar && (
              <Button
                onClick={onCancelar}
                disabled={loading}
                sx={{
                  borderRadius: "50px",
                  border: "1.5px solid #e5e7eb",
                  color: "#111827",
                  px: 2.5,
                  "&:hover": { bgcolor: "#f8fafc", borderColor: "#d1d5db" },
                }}
              >
                Cancelar
              </Button>
            )}
            <Button
              type="submit"
              disabled={loading}
              sx={{
                backgroundColor: "#a3e635",
                color: "#111827",
                fontWeight: 700,
                borderRadius: "50px",
                px: 3,
                boxShadow: "0 4px 12px rgba(163,230,53,0.30)",
                "&:hover": { backgroundColor: "#bef264" },
                "&.Mui-disabled": { backgroundColor: "#e5e7eb", color: "#9ca3af", boxShadow: "none" },
              }}
            >
              {loading ? (
                <><CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />Guardando…</>
              ) : (
                pistaEditando ? "Actualizar pista" : "Crear pista"
              )}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FormularioPista;
