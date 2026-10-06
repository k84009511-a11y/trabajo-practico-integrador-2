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
    <header className="border-b border-emerald-400/30 bg-emerald-950 text-white shadow-[0_4px_24px_rgba(16,185,129,0.18)]">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link className="text-lg font-bold transition hover:text-lime-300" to="/home">Blog personal</Link>
        <div className="flex items-center gap-3">
          <Link className="rounded-lg px-3 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-300/10 hover:text-lime-200" to="/home">Inicio</Link>
          <button className="rounded-lg border border-emerald-400/40 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:border-lime-300 hover:bg-lime-300 hover:text-emerald-950" type="button" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </nav>
    </header>
  );
};
