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

import { ApplicationConfig, ErrorViewModel } from "../../types";

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

export const Error: React.FC = () => {
  // Initialize classes
  const classes = useStyles();

  // Initialize state variables
  const [viewModel, setViewModel] = React.useState<ErrorViewModel>();
  const [error, setError] = React.useState("");
  const [processing, setProcessing] = React.useState(false);

  React.useEffect(() => {
    setProcessing(true);
    // Get parameters and error id
    const params = new URLSearchParams(window.location.search);
    const errorId = params.get("errorId");
    const data = {
      id: errorId,
    } as ErrorViewModel;
    const url = `${ApplicationConfig.apiPublicAddress}/api/error`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((value) => {
        if (value.status === 401) {
          setError("Invalid logout parameters.");
        } else if (value.status === 200) {
          value.json().then((json: ErrorViewModel) => {
            setViewModel(json);
          });
        }
      })
      .finally(() => setProcessing(false));
  }, []);

  return (
    <Grid item xs={12} sm={8} md={4}>
      <Paper className={classes.paper} elevation={3}>
        <img src={logo} className="logo" alt="logo" />
        <Typography variant="h5">Error</Typography>
        <Typography>{viewModel?.error}</Typography>
        <Typography>{viewModel?.errorDescription}</Typography>
        <Typography variant="subtitle2">
          Please email this error to support@chabloom.com
        </Typography>
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
