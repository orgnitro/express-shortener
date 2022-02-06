import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LinksPage, CreatePage, DetailPage, AuthPage } from "../pages/pages";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return <AuthenticatedRoutes />;
  }
  return <UnauthenticatedRoutes />;
};

const AuthenticatedRoutes = () => (
  <Switch>
    <Route path="/links" exact>
      <LinksPage />
    </Route>
    <Route path="/create" exact>
      <CreatePage />
    </Route>
    <Route path="/detail/:id">
      <DetailPage />
    </Route>
    <Redirect to="/create" />
  </Switch>
);

const UnauthenticatedRoutes = () => (
  <Switch>
    <Route path="/" exact>
      <AuthPage />
    </Route>
    <Redirect to="/" />
  </Switch>
);

export default useRoutes;
