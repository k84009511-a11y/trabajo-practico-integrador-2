import { Link } from "react-router-dom";

export const Navbar = () => (
  <header className="border-b border-emerald-400/30 bg-emerald-950 text-white shadow-[0_4px_24px_rgba(16,185,129,0.18)]">
    <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
      <Link className="text-lg font-bold transition hover:text-lime-300" to="/home">Blog personal</Link>
      <Link className="rounded-lg px-3 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-300/10 hover:text-lime-200" to="/home">Inicio</Link>
    </nav>
  </header>
);
