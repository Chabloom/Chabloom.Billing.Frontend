import React from "react";

import { User } from "oidc-client";

import {
  createStyles,
  Grid,
  LinearProgress,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

import { CardInput } from "./CardInput";

import {
  PaymentCardViewModel,
  PaymentsApi,
  PaymentViewModel,
  TransactionsApi,
  TransactionViewModel,
} from "../../types";

import logo from "../../logo.svg";

interface Props {
  user: User | undefined;
}

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

export const Transaction: React.FC<Props> = (props) => {
  // Initialize classes
  const classes = useStyles();

  // Initialize state variables
  const [payment, setPayment] = React.useState<PaymentViewModel>();
  const [returnUrl, setReturnUrl] = React.useState<string>("/");
  const [error, setError] = React.useState("");
  const [processing, setProcessing] = React.useState(false);

  // Get parameters and return URL
  const getPayment = async (paymentId: string) => {
    setProcessing(true);
    const api = new PaymentsApi("");
    const ret = await api.readItem(props.user?.access_token, paymentId);
    if (typeof ret !== "string") {
      setPayment(ret);
    } else {
      setError(ret);
    }
    setProcessing(false);
  };
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get("paymentId");
    if (paymentId) {
      getPayment(paymentId).then();
    }
    const paramReturnUrl = params.get("returnUrl");
    if (paramReturnUrl) {
      setReturnUrl(paramReturnUrl);
    }
  }, []);

  const createTransaction = async (transaction: TransactionViewModel) => {
    setProcessing(true);
    const api = new TransactionsApi();
    const [ret, err] = await api.addItem(props.user?.access_token, transaction);
    if (!ret) {
      setError(err);
    } else {
      const t = ret as TransactionViewModel;
      if (t && t.id) {
        const paymentsApi = new PaymentsApi("");
        let updatedPayment = payment;
        if (updatedPayment) {
          updatedPayment.transaction = t.id;
          await paymentsApi.editItem(props.user?.access_token, updatedPayment);
        }
      }
    }
    setProcessing(false);
  };

  return (
    <Grid item xs={12} sm={8} md={4}>
      <Paper className={classes.paper} elevation={3}>
        <img src={logo} className="logo" alt="logo" />
        <Typography variant="h5">{`Payment for ${payment?.name}`}</Typography>
        {payment && (
          <CardInput
            {...props}
            buttonText={`Pay $${payment.amount}`}
            completeCardInput={(paymentCard: PaymentCardViewModel) => {
              if (payment) {
                const transaction = {
                  name: payment.name,
                  amount: payment.amount,
                  currency: "USD",
                  paymentCard: paymentCard.id,
                } as TransactionViewModel;
                createTransaction(transaction).then();
                window.location.replace(returnUrl);
              }
            }}
          />
        )}
        {processing && <LinearProgress className={classes.mt1} />}
      </Paper>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
    </Grid>
  );
};
