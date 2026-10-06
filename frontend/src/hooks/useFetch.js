import { useCallback, useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(url, { credentials: "include" });

      if (!response.ok) {
        if (response.status === 401) throw new Error("Tu sesión no existe o expiró.");
        if (response.status === 403) throw new Error("No tenés permisos para ver este contenido.");
        throw new Error("No se pudieron cargar los artículos. Intentá más tarde.");
      }

      setData(await response.json());
    } catch (requestError) {
      setError(requestError.message || "No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error };
};
