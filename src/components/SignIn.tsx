import * as React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Checkbox,
  createStyles,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { SignInAPI, SignInViewModel } from "../api";
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
    <Grid container alignItems="center" justifyContent="center" style={{ minHeight: "100vh" }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper className={classes.paper} elevation={3}>
          <img src={logo} className="logo" alt="logo" />
          <Typography variant="h5">Sign in</Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setError("");
              setProcessing(true);
              const viewModel = {
                username: email,
                email: email,
                password: password,
                persist: remember,
                returnUrl: returnUrl,
              } as SignInViewModel;
              const api = new SignInAPI();
              api
                .signIn(viewModel)
                .then((success) => {
                  if (success) {
                    window.location.replace(returnUrl as string);
                  } else {
                    setError(api.lastError());
                  }
                })
                .finally(() => setProcessing(false));
            }}
          >
            <FormGroup>
              <TextField
                required
                variant="standard"
                name="email"
                label="Email"
                value={email}
                type="email"
                disabled={processing}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                variant="standard"
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
              No account? <Link to={`/register${window.location.search}`}>Create one!</Link>
            </Typography>
            <Button
              fullWidth
              className={classes.mt1}
              variant="contained"
              color="primary"
              type="submit"
              disabled={processing}
            >
              Login
            </Button>
          </form>
          <Status processing={processing} error={error} />
        </Paper>
      </Grid>
    </Grid>
  );
};
