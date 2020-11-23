import * as React from "react";

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
  TenantsApi,
  TenantViewModel,
  UserService,
} from "./types";

import { Routes, RoutesMobile } from "./components";

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

const userService = new UserService();

export const App: React.FC = () => {
  const [tenants, setTenants] = React.useState<Array<TenantViewModel>>([]);
  const [darkMode, setDarkMode] = React.useState<boolean>(false);

  // Get all available tenants
  React.useEffect(() => {
    const getItems = async () => {
      const api = new TenantsApi(userService);
      const [items, err] = await api.readItems();
      if (items && !err) {
        setTenants(items);
      }
    };
    getItems().then();
  }, []);

  // Get signed in setting
  React.useEffect(() => {
    const signedIn = localStorage.getItem("SignedIn");
    if (signedIn === "true") {
      userService.getUser().then();
    }
    userService.getUser(false).then();
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
    return (
      <ThemeProvider theme={theme}>
        <RoutesMobile
          userService={userService}
          tenants={tenants}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Routes
          userService={userService}
          tenants={tenants}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </ThemeProvider>
    );
  }
};
