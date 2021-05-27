import React from "react";
import { UserManager } from "oidc-client";
import { createMuiTheme, StylesProvider, ThemeProvider, useMediaQuery } from "@material-ui/core";

import { AccountViewModel, TenantsApi, TenantViewModel, UserAccountsApi, UserAccountViewModel } from "./api";
import { OidcConfiguration } from "./config";

import { AppContext, AppContextProps } from "./AppContext";
import { AppRoutes } from "./AppRoutes";

import "./App.scss";

export const App: React.FC = () => {
  const [userLoaded, setUserLoaded] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userToken, setUserToken] = React.useState("");
  const [darkMode, setDarkMode] = React.useState(false);
  const [selectedAccount, setSelectedAccount] = React.useState<AccountViewModel>();

  const [tenant, setTenant] = React.useState<TenantViewModel>();
  const [tenantRoles, setTenantRoles] = React.useState<string[]>();
  const [selectedRole, setSelectedRole] = React.useState<string>("");
  const [userAccounts, setUserAccounts] = React.useState<Array<UserAccountViewModel>>();

  const userManager = React.useMemo(() => new UserManager(OidcConfiguration), []);
  React.useEffect(() => {
    userManager.events.addUserLoaded((user) => {
      setUserLoaded(true);
      setUserId(user.profile.sub);
      setUserName(user.profile.name as string);
      setUserToken(user.access_token);
    });
    userManager.events.addSilentRenewError((error) => {
      console.log(error);
    });
    userManager.events.addAccessTokenExpired(() => {
      userManager.signinSilent().then((user) => {
        setUserLoaded(true);
        if (user) {
          setUserId(user.profile.sub);
          setUserName(user.profile.name as string);
          setUserToken(user.access_token);
        }
      });
    });
  }, []);

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
          primary: {
            light: "#5b91fc",
            main: "#0064c8",
            dark: "#003b96",
            contrastText: "#ffffff",
          },
          mode: darkMode ? "dark" : "light",
        },
        typography: {
          fontFamily: ["Open Sans", "Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 2,
                textTransform: "none",
              },
            },
          },
        },
      }),
    [darkMode]
  );

  // Get the user
  React.useEffect(() => {
    const getUser = async () => {
      const signedIn = localStorage.getItem("SignedIn") === "true";
      if (signedIn) {
        let user = await userManager.getUser();
        if (user) {
          console.log("returning loaded user");
          setUserLoaded(true);
          setUserId(user.profile.sub);
          setUserName(user.profile.name as string);
          setUserToken(user.access_token);
        } else {
          console.log("signing in silent");
          user = await userManager.signinSilent();
          setUserLoaded(true);
          if (user) {
            setUserId(user.profile.sub);
            setUserName(user.profile.name as string);
            setUserToken(user.access_token);
          }
        }
      } else {
        console.log("not signed in");
      }
    };
    getUser().then();
  }, [userManager]);

  // Get the current tenant
  React.useEffect(() => {
    const getCurrentTenant = async () => {
      const api = new TenantsApi();
      const [_, ret, err] = await api.getCurrent();
      if (ret && !err) {
        setTenant(ret);
      } else {
        console.error(err);
      }
    };
    getCurrentTenant().then();
  }, []);

  // Get the current tenant roles
  React.useEffect(() => {
    const getCurrentTenantRoles = async () => {
      const api = new TenantsApi();
      const [_, ret, err] = await api.getRoles(userToken);
      if (ret && !err) {
        setTenantRoles(ret);
      } else {
        console.error(err);
      }
    };
    getCurrentTenantRoles().then();
  }, [userToken, tenant]);

  // Select the administrative level that was previously selected
  React.useEffect(() => {
    if (tenantRoles && tenantRoles.length !== 0) {
      const storedLevel = localStorage.getItem("UserLevel");
      if (storedLevel === "Admin" && tenantRoles.find((x) => x === "Admin")) {
        setSelectedRole("Admin");
      } else if (storedLevel === "Manager" && tenantRoles.find((x) => x === "Admin")) {
        setSelectedRole("Manager");
      }
    }
  }, [tenantRoles]);

  // Get all accounts the user is tracking
  React.useEffect(() => {
    const getUserAccounts = async () => {
      if (!tenant) {
        return;
      }
      const api = new UserAccountsApi(tenant.id);
      const [_, ret, err] = await api.readAll(userToken);
      if (ret && !err) {
        setUserAccounts(ret);
      } else {
        console.error(err);
      }
    };
    if (userToken) {
      getUserAccounts().then();
    }
  }, [userToken, tenant]);

  const props = {
    userManager: userManager,
    userLoaded: userLoaded,
    userId: userId,
    userName: userName,
    userToken: userToken,
    darkMode: darkMode,
    setDarkMode: setDarkMode,
    tenant: tenant,
    tenantRoles: tenantRoles,
    selectedRole: selectedRole,
    setSelectedRole: setSelectedRole,
    userAccounts: userAccounts,
    setUserAccounts: setUserAccounts,
    selectedAccount: selectedAccount,
    setSelectedAccount: setSelectedAccount,
  } as AppContextProps;

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={props}>
          <AppRoutes />
        </AppContext.Provider>
      </ThemeProvider>
    </StylesProvider>
  );
};
