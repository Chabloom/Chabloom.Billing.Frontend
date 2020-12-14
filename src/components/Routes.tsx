import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { User, UserManager } from "oidc-client";

import {
  AccountViewModel,
  ApplicationUsersApi,
  TenantsApi,
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
  ApplicationUser,
  Bill,
  BillSchedule,
  Tenant,
  TenantUser,
} from "./Manager";
import { Navigation } from "./Navigation";

import { Home } from "./Home";

interface Props {
  user: User | undefined;
  userManager: UserManager;
  darkMode: boolean;
  setDarkMode: CallableFunction;
}

export const Routes: React.FC<Props> = (props) => {
  const [authorizedTenants, setAuthorizedTenants] = React.useState<
    Array<TenantViewModel>
  >([]);
  const [selectedTenant, setSelectedTenant] = React.useState<TenantViewModel>();
  const [userLevel, setUserLevel] = React.useState<
    "admin" | "manager" | undefined
  >();
  const [account, setAccount] = React.useState<AccountViewModel>();
  const [admin, setAdmin] = React.useState(false);
  const [manager, setManager] = React.useState(false);

  // Get tenants that the user is authorized to select
  React.useEffect(() => {
    const getAuthorizedTenants = async () => {
      const api = new TenantsApi(props.user);
      let items: Array<TenantViewModel> | undefined, err: string;
      if (userLevel === "admin") {
        // Admin mode can see all tenants
        [items, err] = await api.readItems();
      } else {
        [items, err] = await api.readItemsAuthorized();
      }
      if (items && items.length !== 0 && !err) {
        const itemsSorted = items.sort((a, b) => a.name.localeCompare(b.name));
        setAuthorizedTenants(itemsSorted);
      }
    };
    if (admin || manager) {
      getAuthorizedTenants().then();
    }
  }, [props.user, admin, manager, userLevel]);

  // Get the user's administrative level
  React.useEffect(() => {
    const getAdminLevel = async () => {
      if (!props.user) {
        return;
      }
      const applicationUsersApi = new ApplicationUsersApi(props.user);
      const [applicationUser, err] = await applicationUsersApi.readItem(
        props.user.profile.sub
      );
      if (applicationUser && !err) {
        setUserLevel("admin");
        return;
      }
      // If the user is authorized for any tenants, they are a manager
      if (authorizedTenants.length !== 0) {
        setUserLevel("manager");
      }
    };
    getAdminLevel().then();
  }, [props.user, authorizedTenants]);

  // Select the tenant that was previously selected
  React.useEffect(() => {
    if (authorizedTenants && authorizedTenants.length !== 0) {
      // Attempt to find the previously selected tenant
      const oldTenantId = window.localStorage.getItem("TenantId");
      if (oldTenantId) {
        const newTenant = authorizedTenants.find((x) => x.id === oldTenantId);
        if (newTenant) {
          // Select the previously selected tenant
          setSelectedTenant(newTenant);
          return;
        }
      }
      // Use the first available tenant
      if (authorizedTenants[0] && authorizedTenants[0].id) {
        window.localStorage.setItem("TenantId", authorizedTenants[0].id);
        setSelectedTenant(authorizedTenants[0]);
      }
    }
  }, [authorizedTenants]);

  return (
    <Router>
      <Navigation
        {...props}
        authorizedTenants={authorizedTenants}
        selectedTenant={selectedTenant}
        setSelectedTenant={setSelectedTenant}
        userLevel={userLevel}
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
          {selectedTenant && (
            <Route path="/accounts">
              <Account
                {...props}
                tenant={selectedTenant}
                setAccount={setAccount}
              />
            </Route>
          )}
          {account && (
            <Route path="/bills">
              <Bill {...props} account={account} />
            </Route>
          )}
          {account && (
            <Route path="/billSchedules">
              <BillSchedule {...props} account={account} />
            </Route>
          )}
          <Route path="/tenants">
            <Tenant {...props} />
          </Route>
          {selectedTenant && (
            <Route path="/managers">
              <TenantUser {...props} tenant={selectedTenant} />
            </Route>
          )}
          <Route path="/administrators">
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
