import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    let logoutMessage = "Sesión cerrada correctamente.";
    try {
      const response = await fetch(`${API_URL}/auth/logout`, { method: "POST", credentials: "include" });
      if (!response.ok) logoutMessage = "Se cerró la sesión local, pero el servidor no pudo invalidar la cookie.";
    } catch (requestError) {
      logoutMessage = requestError.message || "Se cerró la sesión local, pero no se pudo conectar con el servidor.";
    } finally {
      localStorage.removeItem("isLogged");
      navigate("/login", { replace: true, state: { message: logoutMessage } });
    }
  };

  return (
    <header className="bg-slate-900 text-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link className="text-lg font-bold hover:text-blue-300" to="/home">Blog personal</Link>
        <button className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20" type="button" onClick={handleLogout}>Cerrar sesión</button>
      </nav>
    </header>
  );
};
