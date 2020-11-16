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

import { CardInput } from "./CardInput";

import { ApplicationConfig, PaymentCardViewModel } from "../../types";

import logo from "../../logo.svg";
import { Alert, AlertTitle } from "@material-ui/lab";

interface Props {
  user: User;
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

export const TransactionSchedule: React.FC<Props> = (props) => {
  // Initialize classes
  const classes = useStyles();

  // Initialize state variables
  const [name, setName] = React.useState<string>();
  const [amount, setAmount] = React.useState<number>();
  const [returnUrl, setReturnUrl] = React.useState<string>();
  const [error, setError] = React.useState("");
  const [processing, setProcessing] = React.useState(false);

  // Get parameters and return URL
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramName = params.get("name");
    if (paramName) {
      setName(paramName);
    }
    const paramAmount = params.get("amount");
    if (paramAmount) {
      setAmount(parseInt(paramAmount));
    }
    const paramReturnUrl = params.get("returnUrl");
    if (paramReturnUrl) {
      setReturnUrl(paramReturnUrl);
    }
  }, []);

  return (
    <Grid item xs={12} sm={8} md={4}>
      <Paper className={classes.paper} elevation={3}>
        <img src={logo} className="logo" alt="logo" />
        <Typography variant="h5">{`Auto pay for ${name}`}</Typography>
        {amount && (
          <CardInput
            {...props}
            amount={amount}
            buttonText={`Schedule $${amount}`}
            completeCardInput={(paymentCard: PaymentCardViewModel) => {
              const data = {
                paymentCard: paymentCard,
              };
              const url = `${ApplicationConfig.processingApiPublicAddress}/api/transactionSchedule`;
              fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${props.user.access_token}`,
                },
                body: JSON.stringify(data),
              })
                .then((value) => {
                  if (value.status === 401) {
                    setError("Invalid username or password.");
                  } else if (value.status === 403) {
                    setError("Cannot complete transaction.");
                  } else if (value.status === 201) {
                    setError("Transaction success.");
                    window.location.replace(returnUrl as string);
                  }
                })
                .catch((reason) => {
                  setError(reason.message);
                })
                .finally(() => setProcessing(false));
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
