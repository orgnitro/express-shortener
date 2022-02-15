import { useState, useEffect, useCallback } from "react";

const STORAGE_NAME = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

  const logIn = useCallback((id, jwtToken) => {
    setUserId(id);
    setToken(jwtToken);
    localStorage.setItem(
      STORAGE_NAME,
      JSON.stringify({ userId: id, token: jwtToken })
    );
  }, []);

  const logOut = useCallback(() => {
    setUserId(null);
    setToken(null);
    localStorage.removeItem(STORAGE_NAME);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_NAME));

    if (data?.token) {
      logIn(data.userId, data.token);
    }
    setReady(true);
  }, [logIn]);

  return { logIn, logOut, userId, token, ready };
};

export default useAuth;
