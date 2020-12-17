import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Error, Register, SignIn, SignInCallback, SignOut, SignOutCallback } from "./UserManagement";
import { Account, ApplicationUser, Bill, BillSchedule, Tenant, TenantUser } from "./Manager";
import { Navigation } from "./Navigation";
import { Home } from "./Home";
import { useAppContext } from "../AppContext";

export const Routes: React.FC = () => {
  const context = useAppContext();

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
          {context.selectedTenant && (
            <Route path="/accounts">
              <Account />
            </Route>
          )}
          {context.selectedAccount && (
            <Route path="/bills">
              <Bill />
            </Route>
          )}
          {context.selectedAccount && (
            <Route path="/billSchedules">
              <BillSchedule />
            </Route>
          )}
          <Route path="/tenants">
            <Tenant />
          </Route>
          {context.selectedTenant && (
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
