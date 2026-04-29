import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

export function ProtectedRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
