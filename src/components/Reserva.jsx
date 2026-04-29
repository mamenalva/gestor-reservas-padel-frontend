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
import Divider from "@mui/material/Divider";

const Reserva = ({ reserva, onEliminar }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleConfirmarCancelar = () => {
    onEliminar(reserva.id);
    setDialogOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          mb: 2,
          borderRadius: 3,
          border: "1px solid #bbf7d0",
          borderLeft: "5px solid #16a34a",
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, flexWrap: "wrap" }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                bgcolor: "#f0fdf4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                flexShrink: 0,
              }}
            >
              📅
            </Box>

            <Box>
              <Typography variant="caption" sx={{ color: "#6b7280", fontWeight: 700, letterSpacing: 0.5 }}>
                FECHA
              </Typography>
              <Typography variant="body1" fontWeight={700} sx={{ color: "#111827" }}>
                {reserva.fecha}
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            <Box>
              <Typography variant="caption" sx={{ color: "#6b7280", fontWeight: 700, letterSpacing: 0.5 }}>
                HORARIO
              </Typography>
              <Typography variant="body1" fontWeight={700} sx={{ color: "#111827" }}>
                {reserva.horaInicio} – {reserva.horaFin}
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            <Box>
              <Typography variant="caption" sx={{ color: "#6b7280", fontWeight: 700, letterSpacing: 0.5 }}>
                PISTA
              </Typography>
              <Typography variant="body1" fontWeight={700} sx={{ color: "#111827" }}>
                #{reserva.pistaId}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Chip
              label="Confirmada"
              size="small"
              sx={{
                backgroundColor: "#f0fdf4",
                color: "#16a34a",
                fontWeight: 700,
                fontSize: "0.75rem",
                px: 0.5,
              }}
            />
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
              Cancelar reserva
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
          ¿Cancelar reserva?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#6b7280" }}>
            Vas a cancelar la reserva del{" "}
            <strong style={{ color: "#111827" }}>{reserva.fecha}</strong> de{" "}
            <strong style={{ color: "#111827" }}>{reserva.horaInicio}</strong> a{" "}
            <strong style={{ color: "#111827" }}>{reserva.horaFin}</strong>.
            Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setDialogOpen(false)} variant="outlined" color="inherit" sx={{ borderRadius: "50px" }}>
            Volver
          </Button>
          <Button onClick={handleConfirmarCancelar} variant="contained" color="error" sx={{ borderRadius: "50px" }}>
            Cancelar reserva
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Reserva;
