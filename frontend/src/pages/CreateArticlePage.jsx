import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const CreateArticlePage = () => {
  const initialValues = { title: "", excerpt: "", content: "", status: "published" };
  const { formState, handleInputChange, handleReset } = useForm(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors([]);
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/articles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });
      const result = await response.json();

      if (response.status === 400) {
        setErrors(Array.isArray(result) ? result.map((item) => item.msg ?? item) : [result.message || "Revisá los datos ingresados."]);
        return;
      }
      if (!response.ok) {
        if (response.status === 401) throw new Error("Tu sesión expiró. Iniciá sesión nuevamente.");
        if (response.status === 403) throw new Error("No tenés permisos para crear artículos.");
        throw new Error(result.message || "No se pudo publicar el artículo. Intentá más tarde.");
      }

      handleReset();
      setSuccess("El artículo se creó correctamente.");
    } catch (requestError) {
      setErrors([requestError.message || "No se pudo conectar con el servidor."]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-black/30 sm:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">Compartí tus ideas</p>
        <h1 className="mb-6 text-3xl font-bold drop-shadow-[0_1px_4px_rgba(52,211,153,0.18)]">Crear artículo</h1>
        <form className="grid gap-5" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-medium text-slate-200">
            Título
            <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" type="text" name="title" value={formState.title} onChange={handleInputChange} minLength={3} maxLength={200} required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-200">
            Extracto <span className="font-normal text-slate-400">(opcional, hasta 500 caracteres)</span>
            <textarea className="min-h-24 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" name="excerpt" value={formState.excerpt} onChange={handleInputChange} maxLength={500} />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-200">
            Contenido
            <textarea className="min-h-56 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" name="content" value={formState.content} onChange={handleInputChange} minLength={50} maxLength={10000} required />
            <span className="text-xs font-normal text-slate-400">Mínimo 50 caracteres · {formState.content.length}/10000</span>
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-200">
            Estado
            <select className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" name="status" value={formState.status} onChange={handleInputChange}>
              <option value="published">Publicado</option>
              <option value="archived">Archivado</option>
            </select>
          </label>
          {errors.length > 0 && <ul role="alert" className="grid gap-1 rounded-lg border border-rose-900 bg-rose-950/60 p-3 text-sm text-rose-300">{errors.map((error, index) => <li key={`${error}-${index}`}>{error}</li>)}</ul>}
          {success && <p role="status" className="rounded-lg border border-emerald-800 bg-emerald-950/60 p-3 text-sm text-emerald-300">{success} <Link className="ml-1 font-semibold text-sky-300 hover:underline" to="/home">Ver artículos</Link></p>}
          <button className="rounded-lg bg-emerald-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60" type="submit" disabled={isLoading}>
            {isLoading ? "Guardando artículo..." : "Publicar artículo"}
          </button>
        </form>
      </section>
    </main>
  );
};
