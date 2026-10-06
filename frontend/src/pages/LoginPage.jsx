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
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Iniciar sesión</h1>
        {location.state?.message && <p role="status" className="mb-4 text-sm text-green-700">{location.state.message}</p>}
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Correo electrónico
            <input className="rounded-lg border border-slate-300 px-3 py-2" type="email" name="email" value={formState.email} onChange={handleInputChange} required />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Contraseña
            <input className="rounded-lg border border-slate-300 px-3 py-2" type="password" name="password" value={formState.password} onChange={handleInputChange} required />
          </label>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <button className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 disabled:opacity-60" type="submit" disabled={isLoading}>
            {isLoading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        <p className="mt-5 text-sm text-slate-600">¿No tenés cuenta? <Link className="font-semibold text-blue-700 hover:underline" to="/register">Registrate</Link></p>
      </section>
    </main>
  );
};
