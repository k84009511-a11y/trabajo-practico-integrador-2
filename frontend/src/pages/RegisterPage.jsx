import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm.js";

export const RegisterPage = () => {
  const { formState, handleInputChange } = useForm({ firstName: "", lastName: "", username: "", email: "", password: "" });
  const handleSubmit = (event) => event.preventDefault();
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
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">Blog personal</p>
        <h1 className="mb-6 text-2xl font-bold text-white">Crear cuenta</h1>
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          {fields.map(({ name, label, type }) => (
            <label className={`grid gap-1 text-sm font-medium text-slate-200 ${name === "password" ? "sm:col-span-2" : ""}`} key={name}>
              {label}
              <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" type={type} name={name} value={formState[name]} onChange={handleInputChange} required />
            </label>
          ))}
          <button className="rounded-lg bg-emerald-400 px-4 py-2 font-bold text-slate-950 transition hover:bg-emerald-300 sm:col-span-2" type="submit">Registrarme</button>
        </form>
        <p className="mt-5 text-sm text-slate-400">¿Ya tenés cuenta? <Link className="font-semibold text-sky-400 hover:text-sky-300 hover:underline" to="/login">Iniciá sesión</Link></p>
      </section>
    </main>
  );
};
