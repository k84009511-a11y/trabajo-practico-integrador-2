import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const RegisterPage = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  };
  const { formState, handleInputChange, handleReset } = useForm(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });
      const result = await response.json();

      if (response.status === 400) {
        setErrors(
          Array.isArray(result)
            ? result.map((item) => item.msg ?? item)
            : [result.message],
        );
        return;
      }
      if (!response.ok)
        throw new Error(
          result.message ||
            "No se pudo completar el registro. Intentá más tarde.",
        );

      handleReset();
      navigate("/login", { replace: true });
    } catch (requestError) {
      setErrors([
        requestError.message || "No se pudo conectar con el servidor.",
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { name: "firstName", label: "Nombre", type: "text" },
    { name: "lastName", label: "Apellido", type: "text" },
    { name: "username", label: "Nombre de usuario", type: "text" },
    { name: "email", label: "Correo electrónico", type: "email" },
    { name: "password", label: "Contraseña", type: "password" },
  ];

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-4 text-white">
      <section className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-black/30">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
          Blog personal
        </p>
        <h1 className="mb-6 text-2xl font-bold text-white drop-shadow-[0_1px_4px_rgba(52,211,153,0.18)]">
          Crear cuenta
        </h1>
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          {fields.map(({ name, label, type }) => (
            <label
              className={`grid gap-1 text-sm font-medium text-slate-200 ${name === "password" ? "sm:col-span-2" : ""}`}
              key={name}
            >
              {label}
              <input
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                type={type}
                name={name}
                value={formState[name]}
                onChange={handleInputChange}
                required
              />
            </label>
          ))}
          {errors.length > 0 && (
            <ul
              role="alert"
              className="grid gap-1 rounded-lg border border-rose-900 bg-rose-950/60 p-3 text-sm text-rose-300 sm:col-span-2"
            >
              {errors.map((error, index) => (
                <li key={`${error}-${index}`}>{error}</li>
              ))}
            </ul>
          )}
          <button
            className="rounded-lg bg-emerald-400 px-4 py-2 font-bold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60 sm:col-span-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>
        <p className="mt-5 text-sm text-slate-400">
          ¿Ya tenés cuenta?{" "}
          <Link
            className="font-semibold text-sky-400 hover:text-sky-300 hover:underline"
            to="/login"
          >
            Iniciá sesión
          </Link>
        </p>
      </section>
    </main>
  );
};
