import React from "react";

import { User } from "oidc-client";

import { makeStyles } from "@material-ui/core/styles";
import {
  createStyles,
  Grid,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";

import { SearchForm } from "./SearchForm";

interface Props {
  user: User | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  })
);

export const QuickPayment: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Grid item md={6} xs={12}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h6">Quick Payment</Typography>
        <SearchForm {...props} />
      </Paper>
    </Grid>
  );
};
