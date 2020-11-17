import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { User, UserManager } from "oidc-client";

import { TenantViewModel } from "../types";

import {
  Error,
  Register,
  SignIn,
  SignInCallback,
  SignOut,
  SignOutCallback,
} from "./Accounts";
import { Transaction, TransactionSchedule } from "./Processing";

interface Props {
  userManager: UserManager;
  user: User;
  tenants: Array<TenantViewModel>;
  darkMode: boolean;
  setDarkMode: CallableFunction;
}

export const MainMobile: React.FC<Props> = (props) => {
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
        <Route path="/transactions">
          <Transaction {...props} />
        </Route>
        <Route path="/transactionSchedules">
          <TransactionSchedule {...props} />
        </Route>
      </Switch>
    </Router>
  );
};
