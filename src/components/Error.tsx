import * as React from "react";
import { Grid, Paper, Theme, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";

import { ErrorAPI, ErrorViewModel } from "../api";
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
    if (errorId) {
      const api = new ErrorAPI();
      api
        .getError(errorId)
        .then((success) => {
          if (success) {
            setViewModel(api.data() as ErrorViewModel);
          } else {
            setError(api.lastError());
          }
        })
        .finally(() => setProcessing(false));
    }
    setProcessing(false);
  }, []);

  return (
    <Grid container alignItems="center" justifyContent="center" style={{ minHeight: "100vh" }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper className={classes.paper} elevation={3}>
          <img src={logo} className="logo" alt="logo" />
          <Typography variant="h5">Error</Typography>
          <Typography>{viewModel?.error}</Typography>
          <Typography>{viewModel?.errorDescription}</Typography>
          <Typography variant="subtitle2">Please email this error to support@chabloom.com</Typography>
          <Status processing={processing} error={error} />
        </Paper>
      </Grid>
    </Grid>
  );
};
