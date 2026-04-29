import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListadoPistas from "../components/ListadoPistas";

export function PistasPage() {
  return (
    <Box sx={{ backgroundColor: "#f8fafc", minHeight: "calc(100vh - 64px)", py: 5, px: 2 }}>
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            component="h1"
            fontWeight={800}
            sx={{ color: "#111827", mb: 0.5, letterSpacing: "-0.3px" }}
          >
            Gestión de Pistas
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280" }}>
            Administra las pistas disponibles del club
          </Typography>
        </Box>
        <ListadoPistas />
      </Box>
    </Box>
  );
}
