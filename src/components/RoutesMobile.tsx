import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { User, UserManager } from "oidc-client";

import { TenantViewModel } from "../types";

import {
  SignIn,
  SignInCallback,
  SignOut,
  SignOutCallback,
  Error,
  Register,
} from "./UserManagement";

import { Home } from "./Home";

interface Props {
  user: User | undefined;
  userManager: UserManager;
  tenants: Array<TenantViewModel>;
  darkMode: boolean;
  setDarkMode: CallableFunction;
}

export const RoutesMobile: React.FC<Props> = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/signIn">
          <SignIn />
        </Route>
        <Route exact={true} path="/signOut">
          <SignOut />
        </Route>
        <Route exact={true} path="/register">
          <Register />
        </Route>
        <Route exact={true} path="/error">
          <Error />
        </Route>
        <Route exact={true} path="/signin-oidc">
          <SignInCallback {...props} />
        </Route>
        <Route exact={true} path="/signout-oidc">
          <SignOutCallback {...props} />
        </Route>
        <Route path="/">
          <Home {...props} admin={false} manager={false} />
        </Route>
      </Switch>
    </Router>
  );
};
