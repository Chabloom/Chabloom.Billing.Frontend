import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { User, UserManager } from "oidc-client";

import {
  AccountViewModel,
  ApplicationUsersApi,
  TenantUsersApi,
  TenantViewModel,
} from "../types";

import {
  Error,
  Register,
  SignIn,
  SignInCallback,
  SignOut,
  SignOutCallback,
} from "./Accounts";
import { Transaction } from "./Customer";
import {
  Account,
  AccountRole,
  AccountUser,
  ApplicationRole,
  ApplicationUser,
  Payment,
  PaymentSchedule,
  Tenant,
  TenantRole,
  TenantUser,
} from "./Manager";
import { Navigation } from "./Navigation";

import { Home } from "./Home";

interface Props {
  userManager: UserManager;
  user: User | undefined;
  signedIn: boolean;
  tenants: Array<TenantViewModel>;
  darkMode: boolean;
  setDarkMode: CallableFunction;
}

const getAdminLevel = async (user: User) => {
  const applicationUsersApi = new ApplicationUsersApi();
  const applicationUser = await applicationUsersApi.readItem(
    user.access_token,
    user.profile.sub
  );
  if (typeof applicationUser !== "string") {
    return "admin";
  }
  const tenantUsersApi = new TenantUsersApi();
  const tenantUser = await tenantUsersApi.readItem(
    user.access_token,
    user.profile.sub
  );
  if (typeof tenantUser !== "string") {
    return "manager";
  }
  return undefined;
};

export const Main: React.FC<Props> = (props) => {
  const [userLevel, setUserLevel] = React.useState<
    "admin" | "manager" | undefined
  >();
  const [tenant, setTenant] = React.useState<TenantViewModel>();
  const [account, setAccount] = React.useState<AccountViewModel>();
  const [admin, setAdmin] = React.useState(false);
  const [manager, setManager] = React.useState(false);

  // Get the user's administrative level
  React.useEffect(() => {
    if (!props.user || props.user.expired) {
      return;
    }
    getAdminLevel(props.user).then((l) => setUserLevel(l));
  }, [props.user]);

  return (
    <Router>
      <Navigation
        {...props}
        userLevel={userLevel}
        tenant={tenant}
        setTenant={setTenant}
        account={account}
        admin={admin}
        setAdmin={setAdmin}
        manager={manager}
        setManager={setManager}
      >
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
          {tenant && (
            <Route path="/accounts">
              <Account {...props} tenant={tenant} setAccount={setAccount} />
            </Route>
          )}
          {account && (
            <Route path="/payments">
              <Payment {...props} account={account} />
            </Route>
          )}
          {account && (
            <Route path="/paymentSchedules">
              <PaymentSchedule {...props} account={account} />
            </Route>
          )}
          {props.user && account && (
            <Route path="/accountRoles">
              <AccountRole {...props} account={account} />
            </Route>
          )}
          {props.user && account && (
            <Route path="/accountUsers">
              <AccountUser {...props} account={account} />
            </Route>
          )}
          <Route path="/tenants">
            <Tenant {...props} />
          </Route>
          {props.user && tenant && (
            <Route path="/tenantRoles">
              <TenantRole {...props} tenant={tenant} />
            </Route>
          )}
          {props.user && tenant && (
            <Route path="/tenantUsers">
              <TenantUser {...props} tenant={tenant} />
            </Route>
          )}
          {props.user && (
            <Route path="/applicationRoles">
              <ApplicationRole {...props} user={props.user as User} />
            </Route>
          )}
          {props.user && (
            <Route path="/applicationUsers">
              <ApplicationUser {...props} user={props.user as User} />
            </Route>
          )}
          <Route path="/transaction">
            <Transaction {...props} />
          </Route>
          <Route path="/">
            <Home {...props} admin={admin} manager={manager} />
          </Route>
        </Switch>
      </Navigation>
    </Router>
  );
};
