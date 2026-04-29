import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { isAuthenticated, getUsuario, logout } from "../services/authService";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

function getInitials(nombre) {
  if (!nombre) return "?";
  return nombre
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Navbar() {
  const navigate = useNavigate();
  const usuario = getUsuario();
  const autenticado = isAuthenticated();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          maxWidth: 1200,
          width: "100%",
          mx: "auto",
          px: { xs: 2, sm: 3 },
          gap: 0.5,
          minHeight: { xs: 64 },
        }}
      >
        {/* Logo */}
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexGrow: 1,
            textDecoration: "none",
          }}
        >
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              bgcolor: "#16a34a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              flexShrink: 0,
            }}
          >
            🎾
          </Box>
          <Typography
            variant="h6"
            sx={{ color: "#16a34a", fontWeight: 800, letterSpacing: "-0.3px" }}
          >
            Pádel Club
          </Typography>
        </Box>

        <Button
          component={RouterLink}
          to="/"
          sx={{ color: "#111827", fontWeight: 500, fontSize: "0.9rem" }}
        >
          Inicio
        </Button>

        {autenticado ? (
          <>
            <Button
              component={RouterLink}
              to="/pistas"
              sx={{ color: "#111827", fontWeight: 500, fontSize: "0.9rem" }}
            >
              Pistas
            </Button>
            <Button
              component={RouterLink}
              to="/reservas"
              sx={{ color: "#111827", fontWeight: 500, fontSize: "0.9rem" }}
            >
              Reservas
            </Button>

            <Avatar
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                bgcolor: "#16a34a",
                width: 36,
                height: 36,
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer",
                ml: 1,
                transition: "box-shadow 0.2s, transform 0.15s",
                "&:hover": {
                  boxShadow: "0 0 0 3px #86efac",
                  transform: "scale(1.07)",
                },
              }}
            >
              {getInitials(usuario?.nombre)}
            </Avatar>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              slotProps={{
                paper: {
                  elevation: 4,
                  sx: {
                    mt: 1,
                    minWidth: 190,
                    borderRadius: 2,
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  SESIÓN ACTIVA
                </Typography>
                <Typography variant="body2" fontWeight={700} sx={{ color: "#16a34a", mt: 0.2 }}>
                  {usuario?.nombre}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {usuario?.email}
                </Typography>
              </Box>
              <Divider />
              <MenuItem
                onClick={handleLogout}
                sx={{
                  color: "#ef4444",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  py: 1.2,
                  "&:hover": { bgcolor: "#fef2f2" },
                }}
              >
                Cerrar sesión
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button
              component={RouterLink}
              to="/login"
              sx={{ color: "#111827", fontWeight: 500, fontSize: "0.9rem" }}
            >
              Iniciar sesión
            </Button>
            <Button
              component={RouterLink}
              to="/registro"
              size="small"
              sx={{
                ml: 0.5,
                backgroundColor: "#a3e635",
                color: "#111827",
                fontWeight: 700,
                borderRadius: "50px",
                px: 2.5,
                "&:hover": { backgroundColor: "#bef264" },
              }}
            >
              Registrarse
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
