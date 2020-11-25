import * as React from "react";

import { Grid, Paper, Typography } from "@material-ui/core";

import { CardInput } from "./CardInput";

import {
  PaymentCardViewModel,
  PaymentsApi,
  PaymentViewModel,
  TransactionsApi,
  TransactionViewModel,
  useStyles,
  UserService,
} from "../../types";

import { Status } from "../Status";

interface Props {
  userService: UserService;
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
  React.useEffect(() => {
    const getPayment = async (paymentId: string) => {
      setProcessing(true);
      const api = new PaymentsApi(props.userService, "");
      const [item, err] = await api.readItem(paymentId);
      if (item && !err) {
        setPayment(item);
      } else {
        setError(err);
      }
      setProcessing(false);
    };
    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get("paymentId");
    if (paymentId) {
      getPayment(paymentId).then();
    }
    const paramReturnUrl = params.get("returnUrl");
    if (paramReturnUrl) {
      setReturnUrl(paramReturnUrl);
    }
  }, [props.userService]);

  const createTransaction = async (transaction: TransactionViewModel) => {
    setProcessing(true);
    //const api = new TransactionsApi(props.userService);
    //const [ret, err] = await api.addItem(transaction);
    const [ret, err] = [{ id: "C46CC466-6B9C-44B2-8DC7-C542A6EE80B9" }, ""];
    if (!ret && err) {
      setError(err);
      console.log(err);
    } else {
      const t = ret as TransactionViewModel;
      if (t && t.id) {
        const paymentsApi = new PaymentsApi(props.userService, "");
        let updatedPayment = payment;
        if (updatedPayment) {
          updatedPayment.transaction = t.id;
          updatedPayment.complete = true;
          await paymentsApi.editItem(updatedPayment);
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
