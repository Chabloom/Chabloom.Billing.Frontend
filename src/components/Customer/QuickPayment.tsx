import * as React from "react";

import { User } from "oidc-client";

import {
  createStyles,
  Grid,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { AccountViewModel, PaymentViewModel } from "../../types";

import { PaymentOverview } from "./PaymentOverview";
import { QuickPaymentSearch } from "./QuickPaymentSearch";

interface Props {
  user: User | undefined;
}

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

export const QuickPayment: React.FC<Props> = (props) => {
  const [payments, setPayments] = React.useState([] as Array<PaymentViewModel>);

  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h5">Quick Payment</Typography>
          <QuickPaymentSearch
            {...props}
            payments={payments}
            setPayments={setPayments}
          />
        </Paper>
      </Grid>
      {payments.length !== 0 && (
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.paper}>
            <PaymentOverview
              account={{ name: "Account" } as AccountViewModel}
              payments={payments}
            />
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};
