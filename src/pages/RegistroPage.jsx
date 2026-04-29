import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { toast } from "sonner";
import { register } from "../services/authService";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";

export function RegistroPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const data = await register({ nombre, email, password });

      if (data.error) {
        setError(data.error);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data));
        toast.success("¡Cuenta creada! Bienvenido al Club 🎾");
        navigate("/");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8fafc",
        px: 2,
        py: 6,
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 440,
          borderRadius: 4,
          border: "1px solid #e5e7eb",
          boxShadow: "0 8px 40px rgba(0,0,0,0.09)",
          overflow: "hidden",
        }}
      >
        {/* Barra de acento superior */}
        <Box sx={{ height: 4, bgcolor: "#a3e635" }} />

        <CardContent
          sx={{
            px: { xs: 4, sm: 5 },
            pt: 4.5,
            pb: 5,
            "&:last-child": { pb: 5 },
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {/* Brand */}
          <Box sx={{ textAlign: "center", mb: 3.5 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                bgcolor: "#16a34a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.75rem",
                mx: "auto",
                mb: 2.5,
                boxShadow: "0 4px 16px rgba(22,163,74,0.28)",
              }}
            >
              🎾
            </Box>
            <Typography
              variant="h5"
              component="h1"
              sx={{ color: "#111827", fontWeight: 800, letterSpacing: "-0.5px", mb: 0.5 }}
            >
              Crea tu cuenta
            </Typography>
            <Typography variant="body2" sx={{ color: "#6b7280" }}>
              Únete al Club de Pádel y empieza a reservar
            </Typography>
          </Box>

          {/* Error */}
          {error && (
            <Alert severity="error" variant="outlined" sx={{ mb: 2.5 }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
          >
            <TextField
              id="nombre"
              label="Nombre completo"
              type="text"
              variant="outlined"
              fullWidth
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              disabled={loading}
              autoComplete="name"
              placeholder="Tu nombre"
            />

            <TextField
              id="email"
              label="Correo electrónico"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="email"
              placeholder="tu@email.com"
            />

            <TextField
              id="password"
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="new-password"
              placeholder="••••••••"
            />

            <TextField
              id="confirmPassword"
              label="Confirmar contraseña"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              autoComplete="new-password"
              placeholder="••••••••"
              error={!!error && error.includes("contraseña")}
            />

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              size="large"
              sx={{
                mt: 0.5,
                py: 1.6,
                backgroundColor: "#a3e635",
                color: "#111827",
                fontWeight: 700,
                fontSize: "1rem",
                borderRadius: "50px",
                boxShadow: "0 4px 16px rgba(163,230,53,0.35)",
                "&:hover": {
                  backgroundColor: "#bef264",
                  boxShadow: "0 6px 20px rgba(163,230,53,0.50)",
                  transform: "translateY(-1px)",
                },
                "&.Mui-disabled": { backgroundColor: "#e5e7eb", color: "#9ca3af", boxShadow: "none" },
                transition: "all 0.2s",
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />
                  Registrando…
                </>
              ) : (
                "Crear cuenta"
              )}
            </Button>
          </Box>

          {/* Footer */}
          <Typography variant="body2" textAlign="center" sx={{ color: "#6b7280", mt: 3 }}>
            ¿Ya tienes cuenta?{" "}
            <Link
              component={RouterLink}
              to="/login"
              underline="hover"
              sx={{ color: "#16a34a", fontWeight: 600 }}
            >
              Inicia sesión aquí
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
