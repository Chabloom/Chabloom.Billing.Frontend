import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { TenantViewModel } from "../types";

import { Error, Register } from "./Accounts";
import { Transaction } from "./Customer";

import { Home } from "./Home";

import { SignIn } from "./SignIn";
import { SignInCallback } from "./SignInCallback";
import { SignOut } from "./SignOut";
import { SignOutCallback } from "./SignOutCallback";
import { UserService } from "./UserService";

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
        <Route exact={true} path="/Accounts/SignIn">
          <SignIn />
        </Route>
        <Route exact={true} path="/Accounts/SignOut">
          <SignOut />
        </Route>
        <Route exact={true} path="/Accounts/Register">
          <Register />
        </Route>
        <Route exact={true} path="/Accounts/Error">
          <Error />
        </Route>
        <Route exact={true} path="/signin-oidc">
          <SignInCallback {...props} />
        </Route>
        <Route exact={true} path="/signout-oidc">
          <SignOutCallback {...props} />
        </Route>
        <Route path="/transaction">
          <Transaction {...props} />
        </Route>
        <Route path="/">
          <Home {...props} admin={false} manager={false} />
        </Route>
      </Switch>
    </Router>
  );
};
