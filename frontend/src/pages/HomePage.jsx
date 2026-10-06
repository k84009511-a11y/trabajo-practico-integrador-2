import { useFetch } from "../hooks/useFetch.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const HomePage = () => {
  const { isLoading, error, data } = useFetch(`${API_URL}/articles`);

  if (isLoading) return <main className="mx-auto max-w-4xl p-6 text-slate-600">Cargando artículos...</main>;
  if (error) return <main role="alert" className="mx-auto max-w-4xl p-6 text-red-700">{error}</main>;

  const articles = Array.isArray(data) ? data : data?.articles ?? [];
  if (articles.length === 0) {
    return <main className="mx-auto max-w-4xl p-6 text-slate-600">Aún no hay artículos publicados.</main>;
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Artículos publicados</h1>
      <ul className="grid gap-4">
        {articles.map((article) => (
          <li key={article.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{article.title}</h2>
            <p className="mt-2 text-slate-700">{article.excerpt}</p>
            <p className="mt-3 text-sm text-slate-500">Autor: {article.author?.alias ?? article.author?.username ?? "Desconocido"}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};
