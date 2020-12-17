import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Error, Register, SignIn, SignInCallback, SignOut, SignOutCallback } from "./UserManagement";
import { Account, ApplicationUser, Bill, BillSchedule, Tenant, TenantUser } from "./Manager";
import { Navigation } from "./Navigation";
import { Home } from "./Home";
import { useAppContext } from "../AppContext";

export const Routes: React.FC = () => {
  const { selectedTenant, selectedAccount } = useAppContext();

  return (
    <Router>
      <Navigation>
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
            <SignInCallback />
          </Route>
          <Route exact={true} path="/signout-oidc">
            <SignOutCallback />
          </Route>
          {selectedTenant && (
            <Route path="/accounts">
              <Account />
            </Route>
          )}
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
          {selectedTenant && (
            <Route path="/managers">
              <TenantUser />
            </Route>
          )}
          <Route path="/administrators">
            <ApplicationUser />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Navigation>
    </Router>
  );
};
