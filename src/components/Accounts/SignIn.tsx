import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Checkbox,
  createStyles,
  FormControlLabel,
  FormGroup,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

import { ApplicationConfig, SignInViewModel } from "../../types";

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

export const SignIn: React.FC = () => {
  // Initialize classes
  const classes = useStyles();

  // Initialize state variables
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  const [error, setError] = React.useState("");
  const [processing, setProcessing] = React.useState(false);

  // Get parameters and return URL
  const params = new URLSearchParams(window.location.search);
  const returnUrl = params.get("ReturnUrl");

  return (
    <Grid item xs={12} sm={8} md={4}>
      <Paper className={classes.paper} elevation={3}>
        <img src={logo} className="logo" alt="logo" />
        <Typography variant="h5">Sign in</Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setError("");
            setProcessing(true);
            const data = {
              email: email,
              password: password,
              remember: remember,
              returnUrl: returnUrl,
            } as SignInViewModel;
            fetch(`${ApplicationConfig.apiPublicAddress}/api/signIn`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(data),
            })
              .then((value) => {
                if (value.status === 401) {
                  setError("Invalid username or password.");
                } else if (value.status === 200 && returnUrl) {
                  window.location.replace(returnUrl);
                }
              })
              .catch((reason) => {
                setError(reason.message);
              })
              .finally(() => setProcessing(false));
          }}
        >
          <FormGroup>
            <TextField
              required
              name="email"
              label="Email"
              value={email}
              type="email"
              disabled={processing}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              name="password"
              label="Password"
              value={password}
              type="password"
              disabled={processing}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  color="primary"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
              }
              label="Stay logged in"
            />
          </FormGroup>
          <Typography className={classes.mt1} variant="body1">
            No account?{" "}
            <Link to={`/register${window.location.search}`}>Create one!</Link>
          </Typography>
          {error && (
            <Alert className={classes.mt1} severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}
          {processing && <LinearProgress className={classes.mt1} />}
          <Button
            className={classes.mt1}
            variant="contained"
            color="primary"
            type="submit"
            disabled={processing}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
