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

import { PaymentViewModel } from "../../../types";

import { Search } from "./Search";
import { PaymentTable } from "../PaymentTable";

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
  const [payments, setPayments] = React.useState([] as Array<PaymentViewModel>);

  const classes = useStyles();

  return (
    <Grid item md={6} xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6">Quick Payment</Typography>
            <Search {...props} payments={payments} setPayments={setPayments} />
          </Paper>
        </Grid>
        {payments.length !== 0 && (
          <Grid item xs={12}>
            <Paper elevation={3} className={classes.paper}>
              <PaymentTable title="Upcoming Bills" payments={payments} />
            </Paper>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
