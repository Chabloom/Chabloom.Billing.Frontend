import * as React from "react";
import { Grid, Paper, Theme, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";

import { SignInAPI } from "../api";
import { Status } from "./Status";

import logo from "../images/logo.svg";

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
    // Removed the signed in key
    localStorage.removeItem("SignedIn");
    // Get parameters and logout id
    const params = new URLSearchParams(window.location.search);
    const logoutId = params.get("logoutId");
    const api = new SignInAPI();
    api
      .signOut(logoutId as string)
      .then((success) => {
        if (success) {
          window.location.replace("/");
        } else {
          setError(api.lastError());
        }
      })
      .finally(() => setProcessing(false));
  }, []);

  return (
    <Grid container alignItems="center" justifyContent="center" style={{ minHeight: "100vh" }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper className={classes.paper} elevation={3}>
          <img src={logo} className="logo" alt="logo" />
          <Typography variant="h5">Sign out</Typography>
          <Typography>Hang on a moment while we sign you out.</Typography>
          <Status processing={processing} error={error} />
        </Paper>
      </Grid>
    </Grid>
  );
};
