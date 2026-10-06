import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData =
    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(url, { credentials: "include" });

        if (response.status === 401) {
          throw new Error("Sesión inexistente o expirada");
        }
        if (response.status === 403) {
          throw new Error("No tenés permisos para ver este contenido");
        }
        if (!response.ok) {
          throw new Error("Ocurrió un error en el servidor. Intentá más tarde");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error };
};
