import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      if (body) {
        body = JSON.stringify(body);
        headers["Content-type"] = "application/json";
      }
      let data;
      try {
        const response = await fetch(url, { method, body, headers });
        data = await getDataAndCheckErrors(response);
      } catch (e) {
        setError(e.message);
        setLoading(false);
        throw e;
      }
      setLoading(false);
      return data;
    },
    []
  );

  const getDataAndCheckErrors = async (response) => {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong...");
    }
    return data;
  };

  const clearError = () => setError(null);

  return { loading, request, error, clearError };
};

export default useHttp;
