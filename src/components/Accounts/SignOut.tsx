import React from "react";

import {
  createStyles,
  Grid,
  LinearProgress,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

import { ApplicationConfig, SignOutViewModel } from "../../types";

import logo from "../../logo.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(5),
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
    // Get parameters and logout id
    let params = new URLSearchParams(window.location.search);
    let logoutId = params.get("logoutId");
    const data = {
      id: logoutId,
    } as SignOutViewModel;
    const url = `${ApplicationConfig.apiPublicAddress}/api/signOut`;
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
        } else if (value.status === 200) {
          value.json().then((json: SignOutViewModel) => {
            // Redirect to the post logout URL
            if (json.postLogoutRedirectUri) {
              window.location.replace(json.postLogoutRedirectUri);
            }
          });
        }
      })
      .finally(() => setProcessing(false));
  }, []);

  return (
    <Grid item xs={12} sm={8} md={4}>
      <Paper className={classes.paper} elevation={3}>
        <img src={logo} className="logo" alt="logo" />
        <Typography variant="h5">Sign out</Typography>
        <Typography>Hang on a moment while we sign you out.</Typography>
        {error && (
          <Alert className={classes.mt1} severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        {processing && <LinearProgress className={classes.mt1} />}
      </Paper>
    </Grid>
  );
};
