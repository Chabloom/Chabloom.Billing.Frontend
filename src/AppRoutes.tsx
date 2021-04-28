import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Checkout, SignInCallback, SignOutCallback } from "./common";

import { Home, Account, ApplicationUser, Bill, BillSchedule, Tenant, TenantUser, Navigation } from "./components";

import { useAppContext } from "./AppContext";

export const AppRoutes: React.FC = () => {
  const { selectedTenant, selectedAccount } = useAppContext();

  return (
    <Router>
      <Navigation>
        <Switch>
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
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route exact={true} path="/checkout">
            <Checkout />
          </Route>
        </Switch>
      </Navigation>
    </Router>
  );
};
