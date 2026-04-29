import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: "#16a34a",
      dark: "#15803d",
      light: "#4ade80",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ef4444",
      contrastText: "#ffffff",
    },
    success: {
      main: "#10b981",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#f59e0b",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#111827",
      secondary: "#6b7280",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          letterSpacing: "0.01em",
          borderRadius: "10px",
          "&.Mui-disabled": {
            backgroundColor: "#bbf7d0",
            color: "#ffffff",
          },
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#22c55e",
            boxShadow: "0 4px 12px rgba(22,163,74,0.30)",
          },
        },
        sizeLarge: {
          fontSize: "0.9375rem",
          padding: "10px 24px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            "& fieldset": { borderColor: "#e5e7eb" },
            "&:hover fieldset": { borderColor: "#d1d5db" },
            "&.Mui-focused fieldset": { borderColor: "#16a34a" },
            "&.Mui-disabled": { backgroundColor: "#f8fafc" },
          },
          "& .MuiInputLabel-root.Mui-focused": { color: "#16a34a" },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 2px 24px rgba(0,0,0,0.06)",
          border: "1px solid #e5e7eb",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: "10px", fontSize: "0.875rem" },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: "16px" },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#111827",
          boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
          borderBottom: "1px solid #e5e7eb",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: "8px", fontWeight: 600, fontSize: "0.8125rem" },
      },
    },
  },
});
