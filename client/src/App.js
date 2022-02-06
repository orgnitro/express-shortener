import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "./context/auth-context";
import "materialize-css";

import { useRoutes,useAuth } from "./hooks/hooks";
import NavBar from "./components/navbar";

function App() {
  const { userId, token, logIn, logOut } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider
      value={{ userId, token, logIn, logOut, isAuthenticated }}
    >
      <Router>
        {isAuthenticated&&<NavBar/>}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
