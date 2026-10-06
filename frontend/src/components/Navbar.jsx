import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const Navbar = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError("");
    try {
      const response = await fetch(`${API_URL}/auth/logout`, { method: "POST", credentials: "include" });
      if (!response.ok) throw new Error("No se pudo cerrar la sesión en el servidor.");
      localStorage.removeItem("isLogged");
      navigate("/login", { replace: true });
    } catch (requestError) {
      setError(requestError.message || "No se pudo conectar con el servidor.");
    }
  };

  return (
    <header className="bg-slate-900 text-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link className="text-lg font-bold hover:text-blue-300" to="/home">Blog personal</Link>
        <button className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20" type="button" onClick={handleLogout}>Cerrar sesión</button>
      </nav>
      {error && <p role="alert" className="mx-auto max-w-5xl px-6 pb-3 text-sm text-red-300">{error}</p>}
    </header>
  );
};
