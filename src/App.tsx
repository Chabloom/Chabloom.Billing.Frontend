import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";

import { User, UserManager } from "oidc-client";

import {
  AccountViewModel,
  AppInsightsInstrumentationKey,
  ApplicationUsersApi,
  OidcSettings,
  TenantsApi,
  TenantUsersApi,
  TenantViewModel,
} from "./types";

import { createBrowserHistory } from "history";

import {
  Account,
  AccountRole,
  AccountUser,
  ApplicationRole,
  ApplicationUser,
  Home,
  Navigation,
  Payment,
  PaymentSchedule,
  Tenant,
  TenantRole,
  TenantUser,
} from "./components";
import { OidcSignInCallback, OidcSignOutCallback } from "./components/oidc";

import "./App.scss";

const browserHistory = createBrowserHistory({ basename: "" });
const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: AppInsightsInstrumentationKey,
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: { history: browserHistory },
    },
  },
});
appInsights.loadAppInsights();

const userManager = new UserManager(OidcSettings);

export const App: React.FC = () => {
  const [user, setUser] = React.useState<User>();
  const [userLevel, setUserLevel] = React.useState<
    "admin" | "manager" | undefined
  >();
  const [admin, setAdmin] = React.useState(false);
  const [manager, setManager] = React.useState(false);
  const [tenant, setTenant] = React.useState<TenantViewModel>();
  const [allTenants, setAllTenants] = React.useState(
    [] as Array<TenantViewModel>
  );

  const [account, setAccount] = React.useState<AccountViewModel>();

  // Check if the user is signed in
  React.useEffect(() => {
    const signedIn = localStorage.getItem("SignedIn");
    if (signedIn !== "true") {
      console.debug("user not logged in");
      return;
    }
    console.debug("updating user");
    userManager.getUser().then((ret) => {
      if (ret && !ret.expired) {
        console.debug("user valid");
        setUser(ret);
      } else {
        // Attempt silent sign in
        userManager
          .signinSilent()
          .then((ret) => {
            if (ret && !ret.expired) {
              console.debug("got silent user");
              setUser(ret);
            } else {
              // Redirect to sign in
              console.debug("redirecting to sign in");
              localStorage.setItem("redirectUri", window.location.pathname);
              userManager.signinRedirect().then();
            }
          })
          .catch((reason) => console.debug(reason));
      }
    });
  }, []);
  // Get the user's administrative level
  React.useEffect(() => {
    if (user && !user.expired) {
      const api = new ApplicationUsersApi();
      api.readItem(user.access_token, user.profile.sub).then((ret) => {
        if (typeof ret !== "string") {
          setUserLevel("admin");
        } else {
          const tenantUsersApi = new TenantUsersApi();
          tenantUsersApi
            .readItem(user.access_token, user.profile.sub)
            .then((ret) => {
              if (typeof ret !== "string") {
                setUserLevel("manager");
              }
            });
        }
      });
    }
  }, [user]);
  // Get all available tenants
  React.useEffect(() => {
    const api = new TenantsApi();
    api
      .readItems("")
      .then((result) => {
        if (typeof result !== "string") {
          try {
            result = result.sort((a, b) => a.name.localeCompare(b.name));
            setAllTenants(result);
          } catch {
            console.log("item read failed");
          }
        }
      })
      .catch((e) => console.log(e.message));
  }, []);

  return (
    <Router>
      <Navigation
        user={user}
        userManager={userManager}
        userLevel={userLevel}
        tenant={tenant}
        setTenant={setTenant}
        allTenants={allTenants}
        admin={admin}
        setAdmin={setAdmin}
        manager={manager}
        setManager={setManager}
        account={account}
      >
        <Switch>
          <Route exact={true} path="/signin-oidc">
            <OidcSignInCallback userManager={userManager} />
          </Route>
          <Route exact={true} path="/signout-oidc">
            <OidcSignOutCallback userManager={userManager} />
          </Route>
          {tenant && (
            <Route path="/accounts">
              <Account user={user} tenant={tenant} setAccount={setAccount} />
            </Route>
          )}
          {account && (
            <Route path="/payments">
              <Payment user={user} account={account} />
            </Route>
          )}
          {account && (
            <Route path="/paymentSchedules">
              <PaymentSchedule user={user} account={account} />
            </Route>
          )}
          {user && account && (
            <Route path="/accountRoles">
              <AccountRole user={user} account={account} />
            </Route>
          )}
          {user && account && (
            <Route path="/accountUsers">
              <AccountUser user={user} account={account} />
            </Route>
          )}
          <Route path="/tenants">
            <Tenant user={user} />
          </Route>
          {user && tenant && (
            <Route path="/tenantRoles">
              <TenantRole user={user} tenant={tenant} />
            </Route>
          )}
          {user && tenant && (
            <Route path="/tenantUsers">
              <TenantUser user={user} tenant={tenant} />
            </Route>
          )}
          {user && (
            <Route path="/applicationRoles">
              <ApplicationRole user={user} />
            </Route>
          )}
          {user && (
            <Route path="/applicationUsers">
              <ApplicationUser user={user} />
            </Route>
          )}
          <Route path="/">
            <Home
              user={user}
              allTenants={allTenants}
              admin={admin}
              manager={manager}
            />
          </Route>
        </Switch>
      </Navigation>
    </Router>
  );
};
