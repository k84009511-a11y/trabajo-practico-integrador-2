const formatDate = (date) => {
  if (!date) return "Fecha no disponible";
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "Fecha no disponible";
  return new Intl.DateTimeFormat("es-AR", { dateStyle: "long" }).format(parsedDate);
};

export const ArticleModal = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <section
        aria-labelledby="article-modal-title"
        aria-modal="true"
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-emerald-800/70 bg-slate-900 p-6 text-white shadow-2xl shadow-black/50 sm:p-8"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button
          aria-label="Cerrar artículo"
          className="absolute right-4 top-4 rounded-lg px-3 py-1 text-2xl text-slate-300 transition hover:bg-slate-800 hover:text-white"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        <p className="mb-3 pr-12 text-sm font-medium text-emerald-300">
          {article.status === "archived" ? "Archivado" : "Publicado"} · {formatDate(article.createdAt)}
        </p>
        <h2 className="mb-5 pr-8 text-2xl font-bold text-white drop-shadow-[0_1px_4px_rgba(52,211,153,0.18)] sm:text-3xl" id="article-modal-title">
          {article.title}
        </h2>
        {article.excerpt && <p className="mb-5 border-l-2 border-emerald-500 pl-4 text-lg text-slate-300">{article.excerpt}</p>}
        <p className="whitespace-pre-wrap leading-7 text-slate-200">{article.content || "Este artículo no tiene contenido disponible."}</p>
        <p className="mt-8 border-t border-slate-800 pt-4 text-sm text-sky-300">
          Autor: {article.author?.alias ?? article.author?.username ?? "Vos"}
        </p>
      </section>
    </div>
  );
};
