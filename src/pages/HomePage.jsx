import { Link as RouterLink } from "react-router-dom";
import { isAuthenticated } from "../services/authService";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const features = [
  { icon: "🏸", title: "Pistas de Calidad", desc: "Contamos con las mejores pistas de pádel de la ciudad" },
  { icon: "📅", title: "Reservas Fáciles", desc: "Reserva tus pistas en solo unos pocos clics" },
  { icon: "⏰", title: "Horarios Flexibles", desc: "Múltiples horarios disponibles cada día" },
  { icon: "👥", title: "Comunidad Activa", desc: "Únete a una comunidad de amantes del pádel como tú" },
];

const horarios = ["17:30 - 19:00", "19:00 - 20:30", "20:30 - 22:00", "22:00 - 23:30"];

export function HomePage() {
  const autenticado = isAuthenticated();

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
          backgroundImage: "url(https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1600)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.52)",
          }}
        />

        {/* Contenido */}
        <Box sx={{ position: "relative", zIndex: 1, maxWidth: 720, mx: "auto" }}>
          <Typography
            variant="h2"
            component="h1"
            fontWeight={900}
            sx={{
              color: "#fff",
              fontSize: { xs: "2.2rem", sm: "3rem", md: "3.8rem" },
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              mb: 2.5,
              textShadow: "0 2px 16px rgba(0,0,0,0.35)",
            }}
          >
            Reserva tu pista de Pádel
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.78)",
              fontWeight: 400,
              fontSize: { xs: "1rem", md: "1.2rem" },
              mb: 5,
              maxWidth: 520,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Elige horario, selecciona pista y confirma en segundos. Tu próximo partido te espera.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            {autenticado ? (
              <>
                <Button
                  component={RouterLink}
                  to="/pistas"
                  size="large"
                  sx={{
                    backgroundColor: "#a3e635",
                    color: "#14532d",
                    fontWeight: 800,
                    fontSize: "1rem",
                    px: 4.5,
                    py: 1.5,
                    borderRadius: "50px",
                    boxShadow: "0 4px 20px rgba(163,230,53,0.4)",
                    "&:hover": {
                      backgroundColor: "#bef264",
                      boxShadow: "0 6px 24px rgba(163,230,53,0.55)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  Ver Pistas
                </Button>
                <Button
                  component={RouterLink}
                  to="/reservas"
                  size="large"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1rem",
                    px: 4.5,
                    py: 1.5,
                    borderRadius: "50px",
                    border: "2px solid rgba(255,255,255,0.55)",
                    backdropFilter: "blur(4px)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.22)",
                      borderColor: "#fff",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  Mis Reservas
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/registro"
                  size="large"
                  sx={{
                    backgroundColor: "#a3e635",
                    color: "#14532d",
                    fontWeight: 800,
                    fontSize: "1rem",
                    px: 4.5,
                    py: 1.5,
                    borderRadius: "50px",
                    boxShadow: "0 4px 20px rgba(163,230,53,0.4)",
                    "&:hover": {
                      backgroundColor: "#bef264",
                      boxShadow: "0 6px 24px rgba(163,230,53,0.55)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  Empieza ahora
                </Button>
                <Button
                  component={RouterLink}
                  to="/login"
                  size="large"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1rem",
                    px: 4.5,
                    py: 1.5,
                    borderRadius: "50px",
                    border: "2px solid rgba(255,255,255,0.55)",
                    backdropFilter: "blur(4px)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.22)",
                      borderColor: "#fff",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  Iniciar sesión
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>

      {/* Features */}
      <Box sx={{ backgroundColor: "#f8fafc", py: { xs: 7, md: 9 }, px: 2 }}>
        <Box sx={{ maxWidth: 1000, mx: "auto" }}>
          <Typography
            variant="h5"
            fontWeight={700}
            textAlign="center"
            sx={{ color: "#16a34a", mb: 4 }}
          >
            Todo lo que necesitas
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
              gap: 3,
            }}
          >
            {features.map((f) => (
              <Card key={f.title}>
                <CardContent sx={{ p: 3, textAlign: "center" }}>
                  <Typography sx={{ fontSize: "2.5rem", mb: 1.5, lineHeight: 1 }}>
                    {f.icon}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom sx={{ color: "#111827" }}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {f.desc}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Horarios */}
      <Box sx={{ py: { xs: 7, md: 9 }, px: 2, textAlign: "center", backgroundColor: "#ffffff" }}>
        <Box sx={{ maxWidth: 700, mx: "auto" }}>
          <Typography variant="h5" fontWeight={700} sx={{ color: "#16a34a", mb: 1 }}>
            Horarios de Disponibilidad
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Turnos de 1 hora y 30 minutos
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
            {horarios.map((h) => (
              <Box
                key={h}
                sx={{
                  px: 3,
                  py: 1.5,
                  backgroundColor: "#f0fdf4",
                  borderRadius: "10px",
                  border: "1px solid #bbf7d0",
                }}
              >
                <Typography fontWeight={700} sx={{ color: "#16a34a" }}>
                  {h}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
