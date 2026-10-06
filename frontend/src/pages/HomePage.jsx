import { useFetch } from "../hooks/UseFetch.js";

const URL_API = import.meta.env.VITE_API_URL;

export const HomePage = () => {
  const { isLoading, error, data } = useFetch(`${URL_API}/articles`);

  if (isLoading) return <p>Cargando articulos...</p>;

  if (error) return <p className="">{error}</p>;

  if (data.length === 0) return <p>Aún no hay articulos</p>;
  return (
    <ul>
      {data.map((articulo) => (
        <li key={articulo.id} className="">
          <h2>{articulo.tittle}</h2>
          <p>{articulo.excerpt}</p>
          <p>Autor: {articulo.author.username}</p>
        </li>
      ))}
    </ul>
  );
};
