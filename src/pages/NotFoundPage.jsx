import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export function NotFoundPage() {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8fafc",
        px: 2,
        textAlign: "center",
      }}
    >
      <Box sx={{ maxWidth: 480 }}>
        {/* Emoji decorativo */}
        <Typography
          sx={{ fontSize: "5rem", lineHeight: 1, mb: 2, userSelect: "none" }}
          aria-hidden="true"
        >
          🎾
        </Typography>

        {/* 404 grande */}
        <Typography
          sx={{
            fontSize: { xs: "6rem", sm: "9rem" },
            fontWeight: 900,
            lineHeight: 1,
            mb: 1,
            background: "linear-gradient(135deg, #16a34a 30%, #4ade80 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </Typography>

        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ color: "#424242", mb: 1.5 }}
        >
          ¡Fuera de pista!
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, lineHeight: 1.7 }}
        >
          La página que buscas no existe o ha sido movida.
          <br />
          Vuelve al inicio para seguir jugando.
        </Typography>

        <Button
          component={RouterLink}
          to="/"
          size="large"
          sx={{
            backgroundColor: "#a3e635",
            color: "#111827",
            fontWeight: 700,
            fontSize: "1rem",
            px: 5,
            py: 1.5,
            borderRadius: "50px",
            boxShadow: "0 4px 20px rgba(163,230,53,0.40)",
            transition: "all 0.2s",
            "&:hover": {
              backgroundColor: "#bef264",
              boxShadow: "0 6px 24px rgba(163,230,53,0.55)",
              transform: "translateY(-2px)",
            },
          }}
        >
          Volver al inicio
        </Button>
      </Box>
    </Box>
  );
}
