import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {
  Home,
  Account,
  Bill,
  BillSchedule,
  Error,
  Tenant,
  Navigation,
  SignOutCallback,
  SignInCallback,
  SignOut,
  Register,
  SignIn,
} from "./components";

import { useAppContext } from "./AppContext";

export const AppRoutes: React.FC = () => {
  const { userManager, selectedAccount } = useAppContext();

  return (
    <Router>
      <Navigation>
        <Switch>
          <Route exact={true} path="/signin-oidc">
            <SignInCallback userManager={userManager} />
          </Route>
          <Route exact={true} path="/signout-oidc">
            <SignOutCallback userManager={userManager} />
          </Route>
          <Route exact={true} path="/account/signIn">
            <SignIn />
          </Route>
          <Route exact={true} path="/account/signOut">
            <SignOut />
          </Route>
          <Route exact={true} path="/account/register">
            <Register />
          </Route>
          <Route exact={true} path="/account/error">
            <Error />
          </Route>
          <Route path="/accounts">
            <Account />
          </Route>
          {selectedAccount && (
            <Route path="/bills">
              <Bill />
            </Route>
          )}
          {selectedAccount && (
            <Route path="/billSchedules">
              <BillSchedule />
            </Route>
          )}
          <Route path="/tenants">
            <Tenant />
          </Route>
          <Route exact={true} path="/">
            <Home />
          </Route>
        </Switch>
      </Navigation>
    </Router>
  );
};
