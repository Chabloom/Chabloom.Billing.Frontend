import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { TenantViewModel, UserService } from "../types";

import { Error, Register } from "./Accounts";

import { Home } from "./Home";

import { SignIn } from "./SignIn";
import { SignInCallback } from "./SignInCallback";
import { SignOut } from "./SignOut";
import { SignOutCallback } from "./SignOutCallback";

interface Props {
  userService: UserService;
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
