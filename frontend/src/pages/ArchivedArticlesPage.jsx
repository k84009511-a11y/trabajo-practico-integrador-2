import { useState } from "react";
import { ArticleModal } from "../components/ArticleModal.jsx";
import { useFetch } from "../hooks/useFetch.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const ArchivedArticlesPage = () => {
  const { isLoading, error, data } = useFetch(`${API_URL}/articles/user`);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const articles = Array.isArray(data) ? data.filter((article) => article.status === "archived") : [];

  if (isLoading) return <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-6 text-slate-300">Cargando artículos archivados...</main>;
  if (error) return <main role="alert" className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-6 text-rose-300">{error}</main>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold drop-shadow-[0_1px_4px_rgba(52,211,153,0.18)]">Artículos archivados</h1>
        {articles.length === 0 ? (
          <p className="text-slate-300">No tenés artículos archivados.</p>
        ) : (
          <ul className="grid gap-4">
            {articles.map((article) => (
              <li key={article.id}>
                <button
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/90 p-5 text-left shadow-lg shadow-black/20 transition hover:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                  onClick={() => setSelectedArticle(article)}
                  type="button"
                >
                  <h2 className="text-xl font-semibold text-white drop-shadow-[0_1px_4px_rgba(96,165,250,0.12)]">{article.title}</h2>
                  <p className="mt-2 leading-relaxed text-slate-300">{article.excerpt || "Abrir para leer el artículo completo."}</p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </main>
  );
};
