import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const RegisterPage = () => {
  const initialValues = { firstName: "", lastName: "", username: "", email: "", password: "" };
  const { formState, handleInputChange, handleReset } = useForm(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors([]);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });
      const result = await response.json();

      if (response.status === 400) {
        setErrors(Array.isArray(result) ? result.map((item) => item.msg ?? item) : [result.message]);
        return;
      }
      if (!response.ok) throw new Error(result.message || "No se pudo completar el registro. Intentá más tarde.");

      handleReset();
      setMessage("Registro exitoso. Redirigiendo al inicio de sesión...");
      navigate("/login", { replace: true, state: { message: "Tu cuenta se creó correctamente. Iniciá sesión." } });
    } catch (requestError) {
      setErrors([requestError.message || "No se pudo conectar con el servidor."]);
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
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <section className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Crear cuenta</h1>
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          {fields.map(({ name, label, type }) => (
            <label className={`grid gap-1 text-sm font-medium text-slate-700 ${name === "password" ? "sm:col-span-2" : ""}`} key={name}>
              {label}
              <input className="rounded-lg border border-slate-300 px-3 py-2" type={type} name={name} value={formState[name]} onChange={handleInputChange} required />
            </label>
          ))}
          {errors.length > 0 && <ul role="alert" className="grid gap-1 text-sm text-red-700 sm:col-span-2">{errors.map((error, index) => <li key={`${error}-${index}`}>{error}</li>)}</ul>}
          {message && <p role="status" className="text-sm text-green-700 sm:col-span-2">{message}</p>}
          <button className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 disabled:opacity-60 sm:col-span-2" type="submit" disabled={isLoading}>
            {isLoading ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>
        <p className="mt-5 text-sm text-slate-600">¿Ya tenés cuenta? <Link className="font-semibold text-blue-700 hover:underline" to="/login">Iniciá sesión</Link></p>
      </section>
    </main>
  );
};
