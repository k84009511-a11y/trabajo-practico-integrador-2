import { Navigate } from "react-router-dom";

export const PublicRoutes = ({ children }) => (
  localStorage.getItem("isLogged") === "true" ? <Navigate to="/home" replace /> : children
);
