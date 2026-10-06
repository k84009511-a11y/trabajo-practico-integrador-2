import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => (
  localStorage.getItem("isLogged") === "true" ? children : <Navigate to="/login" replace />
);
