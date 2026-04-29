import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

const Pista = ({ pista, onEliminar, onEditar }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleConfirmarEliminar = () => {
    onEliminar(pista.id);
    setDialogOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          mb: 2,
          borderRadius: 3,
          border: "1px solid",
          borderColor: pista.disponible ? "#bbf7d0" : "#fecaca",
          borderLeft: "5px solid",
          borderLeftColor: pista.disponible ? "#16a34a" : "#ef4444",
          transition: "box-shadow 0.2s, transform 0.15s",
          "&:hover": {
            boxShadow: "0 4px 20px rgba(0,0,0,0.09)",
            transform: "translateY(-2px)",
          },
        }}
        elevation={0}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            py: 2.5,
            "&:last-child": { pb: 2.5 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                bgcolor: pista.disponible ? "#f0fdf4" : "#fef2f2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                flexShrink: 0,
              }}
            >
              🏓
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={700} sx={{ color: "#111827", lineHeight: 1.2 }}>
                {pista.nombre}
              </Typography>
              <Typography variant="body2" sx={{ color: "#6b7280", mt: 0.3 }}>
                📍 {pista.ubicacion}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
            <Chip
              label={pista.disponible ? "Disponible" : "No disponible"}
              size="small"
              sx={{
                backgroundColor: pista.disponible ? "#f0fdf4" : "#fef2f2",
                color: pista.disponible ? "#16a34a" : "#ef4444",
                fontWeight: 700,
                fontSize: "0.75rem",
                px: 0.5,
              }}
            />
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => onEditar(pista)}
              sx={{
                borderRadius: "50px",
                transition: "background-color 0.2s",
                "&:hover": { bgcolor: "#f0fdf4" },
              }}
            >
              Editar
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => setDialogOpen(true)}
              sx={{
                borderRadius: "50px",
                transition: "background-color 0.2s",
                "&:hover": { bgcolor: "#fef2f2" },
              }}
            >
              Eliminar
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: 3, px: 1 } }}
      >
        <DialogTitle fontWeight={700} sx={{ pt: 3, color: "#111827" }}>
          ¿Eliminar pista?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#6b7280" }}>
            Vas a eliminar <strong style={{ color: "#111827" }}>{pista.nombre}</strong>. Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setDialogOpen(false)} variant="outlined" color="inherit" sx={{ borderRadius: "50px" }}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmarEliminar} variant="contained" color="error" sx={{ borderRadius: "50px" }}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Pista;
