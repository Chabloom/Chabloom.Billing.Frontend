import React from "react";

import { User } from "oidc-client";

import { Grid, Paper, Typography } from "@material-ui/core";

import { CardInput } from "./CardInput";

import {
  PaymentCardViewModel,
  PaymentsApi,
  PaymentViewModel,
  TransactionsApi,
  TransactionViewModel,
  useStyles,
} from "../../types";

import { Status } from "../Status";

interface Props {
  user: User | undefined;
}

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
    <div>
      <Grid container justify="center" style={{ minHeight: "100vh" }}>
        <Grid item xs={12} sm={8} md={6}>
          <Paper className={classes.paper} elevation={3}>
            <Typography
              variant="h5"
              align="center"
            >{`Payment for ${payment?.name}`}</Typography>
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
            <Status processing={processing} error={error} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
