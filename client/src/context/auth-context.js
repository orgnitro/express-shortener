import { createContext } from "react";

export default createContext({
  token: null,
  userId: null,
  logIn: () => {},
  logOut: () => {},
  isAuthenticated: false,
});
