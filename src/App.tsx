import React from "react";

import { User, UserManager } from "oidc-client";

import {
  createMuiTheme,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";

import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";

import { createBrowserHistory } from "history";

import {
  AppInsightsInstrumentationKey,
  appIsStandalone,
  OidcSettings,
  TenantsApi,
  TenantViewModel,
} from "./types";

import { Main, MainMobile } from "./components";

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

const getUser = async (
  userManager: UserManager
): Promise<[boolean, User | undefined]> => {
  // Check if the user wishes to be signed in
  if (!appIsStandalone()) {
    const signedIn = localStorage.getItem("SignedIn");
    if (signedIn !== "true") {
      return [false, undefined];
    }
  }
  // Check if the user is already logged in
  let user = await userManager.getUser();
  if (user && !user.expired) {
    return [true, user];
  }
  // Attempt silent sign in
  user = await userManager.signinSilent();
  if (user && !user.expired) {
    return [true, user];
  }
  // Redirect to sign in page
  localStorage.setItem("redirectUri", window.location.pathname);
  await userManager.signinRedirect();
  return [false, undefined];
};

const getTenants = async () => {
  const tenantsApi = new TenantsApi();
  const tenants = await tenantsApi.readItems("");
  if (typeof tenants !== "string") {
    return tenants;
  }
  return [] as Array<TenantViewModel>;
};

export const App: React.FC = () => {
  const [signedIn, setSignedIn] = React.useState(false);
  const [user, setUser] = React.useState<User>();
  const [tenants, setTenants] = React.useState<Array<TenantViewModel>>([]);
  const [darkMode, setDarkMode] = React.useState<boolean>(false);

  // Ensure user is signed in
  React.useEffect(() => {
    getUser(userManager).then(([s, u]) => {
      setSignedIn(s);
      setUser(u);
    });
  }, []);

  // Add access token expired event
  React.useEffect(() => {
    userManager.events.addUserLoaded((u) => {
      setUser(u);
      window.location.replace(window.location.pathname);
    });
    userManager.events.addAccessTokenExpired(() =>
      getUser(userManager).then(([s, u]) => {
        setSignedIn(s);
        setUser(u);
      })
    );
  }, []);

  // Get all available tenants
  React.useEffect(() => {
    getTenants().then((t) => setTenants(t));
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
          type: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  if (appIsStandalone()) {
    // User is required in standalone mode
    if (!user) {
      return null;
    }
    return (
      <ThemeProvider theme={theme}>
        <MainMobile
          userManager={userManager}
          user={user}
          tenants={tenants}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Main
          userManager={userManager}
          user={user}
          signedIn={signedIn}
          tenants={tenants}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </ThemeProvider>
    );
  }
};
