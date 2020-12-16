import * as React from "react";

import { User, UserManager } from "oidc-client";

import { createMuiTheme, ThemeProvider, useMediaQuery } from "@material-ui/core";

import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";

import { createBrowserHistory } from "history";

import { AppInsightsInstrumentationKey, OidcSettings } from "./types";

import { Routes } from "./components";

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

export const App: React.FC = () => {
  const [user, setUser] = React.useState<User>();
  const [darkMode, setDarkMode] = React.useState<boolean>(false);

  const userManager = React.useMemo(() => new UserManager(OidcSettings), []);
  React.useEffect(() => {
    userManager.events.addUserLoaded((user) => {
      setUser(user);
    });
    userManager.events.addSilentRenewError((error) => {
      console.log(error);
    });
    userManager.events.addAccessTokenExpired(() => {
      userManager.signinSilent().then((user) => setUser(user));
    });
  }, [userManager]);

  React.useEffect(() => {
    const getUser = async () => {
      if (localStorage.getItem("SignedIn") === "true") {
        let user = await userManager.getUser();
        if (user) {
          console.debug("set existing user called");
          setUser(user);
          return;
        }
        console.debug("sign in silent called");
        user = await userManager.signinSilent();
        setUser(user);
      }
    };
    getUser().then();
  }, [userManager]);

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

  return (
    <ThemeProvider theme={theme}>
      <Routes user={user} userManager={userManager} darkMode={darkMode} setDarkMode={setDarkMode} />
    </ThemeProvider>
  );
};
