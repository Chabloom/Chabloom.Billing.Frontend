import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Checkout } from "./checkout";
import { SignInCallback, SignOutCallback } from "./common";
import { Home, Account, Bill, BillSchedule, Tenant, Navigation } from "./components";

import { useAppContext } from "./AppContext";

export const AppRoutes: React.FC = () => {
  const { userManager, selectedAccount, productCounts, setProductCounts, pickupMethod } = useAppContext();

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
          <Route exact={true} path="/checkout">
            <Checkout productCounts={productCounts} setProductCounts={setProductCounts} pickupMethod={pickupMethod} />
          </Route>
        </Switch>
      </Navigation>
    </Router>
  );
};
