import { useEffect, useState, useCallback } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(url, { credentials: "include" });

      if (res.status === 401) {
        throw new Error("Sesión inexistente o expirada");
      }
      if (res.status === 403) {
        throw new Error("No tenés permisos para ver este contenido");
      }
      if (!res.ok) {
        throw new Error("Ocurrió un error en el servidor. Intentá más tarde");
      }

      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error };
};
