import * as React from "react";

import { User, UserManager } from "oidc-client";

import { createMuiTheme, ThemeProvider, useMediaQuery } from "@material-ui/core";

import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";

import { createBrowserHistory } from "history";

import {
  AccountsApi,
  AccountViewModel,
  AppInsightsInstrumentationKey,
  ApplicationUsersApi,
  OidcSettings,
  TenantsApi,
  TenantViewModel,
} from "./types";

import { Routes } from "./components";

import "./App.scss";
import { AppContext, AppContextProps, UserLevel } from "./AppContext";

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

export const App: React.FC = () => {
  const [userLoaded, setUserLoaded] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const [userLevel, setUserLevel] = React.useState(UserLevel.Customer);
  const [selectedUserLevel, setSelectedUserLevel] = React.useState(UserLevel.Customer);
  const [authorizedTenants, setAuthorizedTenants] = React.useState<Array<TenantViewModel>>([]);
  const [selectedTenant, setSelectedTenant] = React.useState<TenantViewModel>();
  const [selectedAccount, setSelectedAccount] = React.useState<AccountViewModel>();
  const [trackedAccounts, setTrackedAccounts] = React.useState<Array<AccountViewModel>>([]);

  const userManager = React.useMemo(() => new UserManager(OidcSettings), []);
  React.useEffect(() => {
    userManager.events.addUserLoaded((user) => {
      console.log(user);
      console.log("user loaded");
      setUserLoaded(true);
    });
    userManager.events.addSilentRenewError((error) => {
      console.log(error);
    });
    userManager.events.addAccessTokenExpired(() => {
      userManager.signinSilent().then();
    });
  }, [userManager]);

  const getUser = async (): Promise<User | null> => {
    const signedIn = localStorage.getItem("SignedIn") === "true";
    if (signedIn) {
      let user = await userManager.getUser();
      if (user) {
        console.log("returning loaded user");
        setUserLoaded(true);
        return user;
      } else {
        console.log("signing in silent");
        user = await userManager.signinSilent();
        setUserLoaded(true);
        return user;
      }
    }
    console.log("not signed in");
    return null;
  };

  // Get dark mode setting
  const cssDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  React.useEffect(() => {
    const storedDarkMode = localStorage.getItem("DarkMode");
    if (storedDarkMode === "true") {
      setDarkMode(true);
    } else {
      setDarkMode(cssDarkMode);
    }
  }, [cssDarkMode]);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkMode ? "dark" : "light",
        },
        typography: {
          fontFamily: ["Open Sans", "Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
        },
      }),
    [darkMode]
  );

  // Get the user's administrative level
  React.useEffect(() => {
    if (userLoaded) {
      getUser().then((user) => {
        if (user) {
          const api = new ApplicationUsersApi(user);
          api.readItem(user.profile.sub).then(([ret, err]) => {
            if (ret && !err) {
              setUserLevel(UserLevel.Admin);
            } else {
              if (authorizedTenants.length !== 0) {
                setUserLevel(UserLevel.Manager);
              }
            }
          });
        }
      });
    }
  }, [userLoaded, authorizedTenants]);

  // Select the administrative level that was previously selected
  React.useEffect(() => {
    if (userLoaded) {
      if (userLevel !== UserLevel.Customer) {
        const storedLevel = localStorage.getItem("UserLevel");
        if (storedLevel === "Admin") {
          setSelectedUserLevel(UserLevel.Admin);
        } else if (storedLevel === "Manager") {
          setSelectedUserLevel(UserLevel.Manager);
        }
      }
    }
  }, [userLoaded, userLevel]);

  // Get tenants that the user is authorized to select
  React.useEffect(() => {
    if (userLoaded) {
      if (selectedUserLevel !== UserLevel.Customer) {
        getUser().then((user) => {
          if (user) {
            const api = new TenantsApi(user);
            api.readItemsAuthorized().then(([ret, err]) => {
              if (ret) {
                if (ret.length !== 0) {
                  const sorted = ret.sort((a, b) => a.name.localeCompare(b.name));
                  setAuthorizedTenants(sorted);
                }
              } else {
                console.log(err);
              }
            });
          }
        });
      }
    }
  }, [userLoaded, selectedUserLevel]);

  // Select the tenant that was previously selected
  React.useEffect(() => {
    if (userLoaded) {
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
    }
  }, [userLoaded, authorizedTenants]);

  // Get all accounts the user is tracking
  React.useEffect(() => {
    getUser().then((user) => {
      if (user) {
        const api = new AccountsApi(user);
        api.readItemsAuthorized().then(([ret, err]) => {
          if (ret) {
            setTrackedAccounts(ret);
          } else {
            console.log(err);
          }
        });
      }
    });
  }, []);

  const props = {
    userManager: userManager,
    getUser: getUser,
    userLoaded: userLoaded,
    darkMode: darkMode,
    setDarkMode: setDarkMode,
    userLevel: userLevel,
    selectedUserLevel: selectedUserLevel,
    setSelectedUserLevel: setSelectedUserLevel,
    authorizedTenants: authorizedTenants,
    selectedTenant: selectedTenant,
    setSelectedTenant: setSelectedTenant,
    selectedAccount: selectedAccount,
    setSelectedAccount: setSelectedAccount,
    trackedAccounts: trackedAccounts,
    setTrackedAccounts: setTrackedAccounts,
  } as AppContextProps;

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={props}>
        <Routes />
      </AppContext.Provider>
    </ThemeProvider>
  );
};
