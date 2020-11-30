import * as React from "react";

import { Grid, Paper, Typography } from "@material-ui/core";

import { useStyles, UserService } from "../../types";

import { Status } from "../Status";

import logo from "../../logo.svg";

interface Props {
  userService: UserService;
}

export const SignInCallback: React.FC<Props> = (props) => {
  // Initialize classes
  const classes = useStyles();

  // Sign in and redirect to the specified redirect URI
  React.useEffect(() => {
    const redirectUri = localStorage.getItem("redirectUri");
    props.userService.signinRedirectCallback().then(() => {
      localStorage.setItem("SignedIn", "true");
      window.location.replace(redirectUri === null ? "/" : redirectUri);
    });
  }, [props.userService]);

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
