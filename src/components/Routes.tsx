import * as React from "react";
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
} from "./UserManagement";
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
  user: User | undefined;
  userManager: UserManager;
  tenants: Array<TenantViewModel>;
  darkMode: boolean;
  setDarkMode: CallableFunction;
}

export const Routes: React.FC<Props> = (props) => {
  const [userLevel, setUserLevel] = React.useState<
    "admin" | "manager" | undefined
  >();
  const [tenant, setTenant] = React.useState<TenantViewModel>();
  const [account, setAccount] = React.useState<AccountViewModel>();
  const [admin, setAdmin] = React.useState(false);
  const [manager, setManager] = React.useState(false);

  // Get the user's administrative level
  React.useEffect(() => {
    const getAdminLevel = async () => {
      if (props.user && !props.user.expired) {
        const applicationUsersApi = new ApplicationUsersApi(props.user);
        const [applicationUser, err] = await applicationUsersApi.readItem(
          props.user.profile.sub
        );
        if (applicationUser && !err) {
          setUserLevel("admin");
        } else {
          const tenantUsersApi = new TenantUsersApi(props.user);
          const [tenantUser, err] = await tenantUsersApi.readItem(
            props.user.profile.sub
          );
          if (tenantUser && !err) {
            setUserLevel("manager");
          }
        }
      }
    };
    getAdminLevel().then();
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
          {account && (
            <Route path="/accountRoles">
              <AccountRole {...props} account={account} />
            </Route>
          )}
          {account && (
            <Route path="/accountUsers">
              <AccountUser {...props} account={account} />
            </Route>
          )}
          <Route path="/tenants">
            <Tenant {...props} />
          </Route>
          {tenant && (
            <Route path="/tenantRoles">
              <TenantRole {...props} tenant={tenant} />
            </Route>
          )}
          {tenant && (
            <Route path="/tenantUsers">
              <TenantUser {...props} tenant={tenant} />
            </Route>
          )}
          <Route path="/applicationRoles">
            <ApplicationRole {...props} />
          </Route>
          <Route path="/applicationUsers">
            <ApplicationUser {...props} />
          </Route>
          <Route path="/">
            <Home {...props} admin={admin} manager={manager} />
          </Route>
        </Switch>
      </Navigation>
    </Router>
  );
};
