import * as React from "react";

import {
  createStyles,
  Grid,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { ApplicationConfig, SignOutViewModel } from "../../types";

import { Status } from "../Status";

import logo from "../../logo.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
    mt1: {
      marginTop: theme.spacing(1),
    },
  })
);

export const SignOut: React.FC = () => {
  // Initialize classes
  const classes = useStyles();

  // Initialize state variables
  const [error, setError] = React.useState("");
  const [processing, setProcessing] = React.useState(false);

  React.useEffect(() => {
    setProcessing(true);
    // Removed the signed in key
    localStorage.removeItem("SignedIn");
    // Get parameters and logout id
    let params = new URLSearchParams(window.location.search);
    let logoutId = params.get("logoutId");
    const data = {
      id: logoutId,
    } as SignOutViewModel;
    const url = `${ApplicationConfig.accountsApiPublicAddress}/api/signOut`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((value) => {
        if (value.status === 401) {
          setError("Invalid logout parameters.");
          return;
        } else if (value.status === 200) {
          value.json().then((json: SignOutViewModel) => {
            // Redirect to the post logout URL
            if (json.postLogoutRedirectUri) {
              window.location.replace(json.postLogoutRedirectUri);
            }
          });
        }
        window.location.replace("/");
      })
      .finally(() => setProcessing(false));
  }, []);

  return (
    <div>
      <Grid container justify="center" style={{ minHeight: "100vh" }}>
        <Grid item xs={12} sm={8} md={6}>
          <Paper className={classes.paper} elevation={3}>
            <img src={logo} className="logo" alt="logo" />
            <Typography variant="h5">Sign out</Typography>
            <Typography>Hang on a moment while we sign you out.</Typography>
            <Status processing={processing} error={error} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
