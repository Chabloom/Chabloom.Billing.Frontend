import * as React from "react";

import { Grid, Paper, Typography } from "@material-ui/core";

import { PaymentViewModel, UserService, useStyles } from "../../../types";

import { Search } from "./Search";
import { PaymentTable } from "../PaymentTable";

interface Props {
  userService: UserService;
}

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
