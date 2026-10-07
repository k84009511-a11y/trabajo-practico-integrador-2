import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm.js";

export const LoginPage = () => {
  const { formState, handleInputChange } = useForm({ email: "", password: "" });

  const handleSubmit = (event) => event.preventDefault();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-4 text-white">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-black/30">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">Blog personal</p>
        <h1 className="mb-6 text-2xl font-bold text-white">Iniciar sesión</h1>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-1 text-sm font-medium text-slate-200">
            Correo electrónico
            <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" type="email" name="email" value={formState.email} onChange={handleInputChange} required />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-200">
            Contraseña
            <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" type="password" name="password" value={formState.password} onChange={handleInputChange} required />
          </label>
          <button className="rounded-lg bg-emerald-400 px-4 py-2 font-bold text-slate-950 transition hover:bg-emerald-300" type="submit">Ingresar</button>
        </form>
        <p className="mt-5 text-sm text-slate-400">¿No tenés cuenta? <Link className="font-semibold text-sky-400 hover:text-sky-300 hover:underline" to="/register">Registrate</Link></p>
      </section>
    </main>
  );
};
