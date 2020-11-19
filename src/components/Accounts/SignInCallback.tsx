import React from "react";

import { UserManager } from "oidc-client";

import { Grid, Paper, Typography } from "@material-ui/core";

import { useStyles } from "../../types";

import { Status } from "../Status";

import logo from "../../logo.svg";

interface Props {
  userManager: UserManager;
}

export const SignInCallback: React.FC<Props> = (props) => {
  // Initialize classes
  const classes = useStyles();

  const redirectUri = localStorage.getItem("redirectUri");
  localStorage.setItem("SignedIn", "true");
  props.userManager
    .signinRedirectCallback()
    .then(() =>
      window.location.replace(redirectUri === null ? "" : redirectUri)
    );

  return (
    <div>
      <Grid container justify="center" style={{ minHeight: "100vh" }}>
        <Grid item xs={12} sm={8} md={6}>
          <Paper className={classes.paper} elevation={3}>
            <img src={logo} className="logo" alt="logo" />
            <Typography variant="h5">Sign in</Typography>
            <Typography>Hang on a moment while we sign you in.</Typography>
            <Status processing={true} error="" />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
