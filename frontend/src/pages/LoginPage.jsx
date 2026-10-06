import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const LoginPage = () => {
  const { formState, handleInputChange } = useForm({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });
      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) throw new Error("El correo o la contraseña son incorrectos.");
        if (response.status === 400) throw new Error(result.map((item) => item.msg ?? item).join(" "));
        throw new Error(result.message || "No se pudo iniciar sesión. Intentá más tarde.");
      }

      localStorage.setItem("isLogged", "true");
      navigate("/home", { replace: true });
    } catch (requestError) {
      setError(requestError.message || "No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-4 text-white">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-black/30">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">Blog personal</p>
        <h1 className="mb-6 text-2xl font-bold text-white drop-shadow-[0_2px_12px_rgba(52,211,153,0.35)]">Iniciar sesión</h1>
        {location.state?.message && <p role="status" className="mb-4 rounded-lg border border-emerald-800 bg-emerald-950/60 p-3 text-sm text-emerald-300">{location.state.message}</p>}
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-1 text-sm font-medium text-slate-200">
            Correo electrónico
            <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" type="email" name="email" value={formState.email} onChange={handleInputChange} required />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-200">
            Contraseña
            <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" type="password" name="password" value={formState.password} onChange={handleInputChange} required />
          </label>
          {error && <p role="alert" className="rounded-lg border border-rose-900 bg-rose-950/60 p-3 text-sm text-rose-300">{error}</p>}
          <button className="rounded-lg bg-emerald-400 px-4 py-2 font-bold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60" type="submit" disabled={isLoading}>
            {isLoading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        <p className="mt-5 text-sm text-slate-400">¿No tenés cuenta? <Link className="font-semibold text-sky-400 hover:text-sky-300 hover:underline" to="/register">Registrate</Link></p>
      </section>
    </main>
  );
};
