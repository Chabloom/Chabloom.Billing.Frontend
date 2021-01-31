import * as React from "react";

import { Button, createStyles, FormGroup, Grid, Paper, TextField, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { ApplicationConfig, RegisterViewModel } from "../../types";

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

export const Register: React.FC = () => {
  // Initialize classes
  const classes = useStyles();

  // Initialize state variables
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password1, setPassword1] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [error, setError] = React.useState("");
  const [processing, setProcessing] = React.useState(false);

  // Get parameters and return URL
  const params = new URLSearchParams(window.location.search);
  const returnUrl = params.get("ReturnUrl");

  return (
    <div>
      <Grid container justifyContent="center" style={{ minHeight: "100vh" }}>
        <Grid item xs={12} sm={8} md={6}>
          <Paper className={classes.paper} elevation={3}>
            <img src={logo} className="logo" alt="logo" />
            <Typography variant="h5">Register account</Typography>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setError("");
                setProcessing(true);
                if (password1 !== password2) {
                  setError("Passwords do not match");
                  setProcessing(false);
                  return;
                }
                const data = {
                  name: name,
                  email: email,
                  phone: phone,
                  password: password1,
                  returnUrl: returnUrl,
                } as RegisterViewModel;
                fetch(`${ApplicationConfig.accountsApiPublicAddress}/api/register`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                  body: JSON.stringify(data),
                })
                  .then(async (value) => {
                    if (value.status === 400) {
                      setError(await value.text());
                    } else if (value.status === 200 && returnUrl) {
                      window.location.replace(`/signIn${window.location.search}`);
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
                  variant="standard"
                  name="name"
                  label="Name"
                  value={name}
                  disabled={processing}
                  onChange={(e) => setName(e.target.value)}
                />
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
                  name="phone"
                  label="Phone"
                  value={phone}
                  type="tel"
                  disabled={processing}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                  required
                  variant="standard"
                  name="password1"
                  label="Password"
                  value={password1}
                  type="password"
                  disabled={processing}
                  onChange={(e) => setPassword1(e.target.value)}
                />
                <TextField
                  required
                  variant="standard"
                  name="password2"
                  label="Password (confirm)"
                  value={password2}
                  type="password"
                  disabled={processing}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </FormGroup>
              <Button
                fullWidth
                className={classes.mt1}
                variant="contained"
                color="primary"
                type="submit"
                disabled={processing}
              >
                Register
              </Button>
            </form>
            <Status processing={processing} error={error} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
