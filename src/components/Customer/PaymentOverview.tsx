import * as React from "react";

import { User } from "oidc-client";

import {
  Card,
  CardActions,
  CardContent,
  createStyles,
  Grid,
  IconButton,
  Paper,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  AddCircle,
  CheckCircle,
  Payment,
  RemoveCircle,
} from "@material-ui/icons";

import {
  AccountUsersApi,
  AccountUserViewModel,
  AccountViewModel,
  PaymentsApi,
  PaymentViewModel,
} from "../../types";

import { MakeTransaction } from "./MakeTransaction";
import { Status } from "../Status";

interface Props {
  user: User | undefined;
  account: AccountViewModel;
  allowTracking: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  })
);

export const PaymentOverview: React.FC<Props> = (props) => {
  const [
    selectedPayment,
    setSelectedPayment,
  ] = React.useState<PaymentViewModel>();
  const [accountPayments, setAccountPayments] = React.useState(
    [] as Array<PaymentViewModel>
  );
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState("");

  const classes = useStyles();

  // Get all account payments
  React.useEffect(() => {
    const getAccountPayments = async () => {
      setProcessing(true);
      const paymentsApi = new PaymentsApi(undefined, props.account.id);
      const [payments, err] = await paymentsApi.readItems();
      if (payments) {
        const futurePayments = payments.filter(
          (x) => new Date(x.dueDate) > new Date()
        );
        setAccountPayments(futurePayments);
      } else {
        setError(err);
      }
      setProcessing(false);
    };
    getAccountPayments().then();
  }, [props.account]);

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item style={{ flexGrow: 1, margin: "auto" }}>
              <Typography variant="h5">{props.account.name}</Typography>
            </Grid>
            {props.user && props.allowTracking && (
              <Grid item>
                <Tooltip title="Track account">
                  <IconButton
                    onClick={() => {
                      if (props.user && !props.user.expired) {
                        setProcessing(true);
                        const model = {
                          userId: props.user?.profile.sub,
                        } as AccountUserViewModel;
                        const api = new AccountUsersApi(
                          props.user,
                          props.account.id
                        );
                        api
                          .addItem(model)
                          .then()
                          .finally(() => setProcessing(false));
                      }
                    }}
                  >
                    <AddCircle />
                  </IconButton>
                </Tooltip>
              </Grid>
            )}
            {props.user && !props.allowTracking && (
              <Grid item>
                <Tooltip title="Don't track account">
                  <IconButton
                    onClick={() => {
                      if (props.user && !props.user.expired) {
                        setProcessing(true);
                        const model = {
                          userId: props.user?.profile.sub,
                        } as AccountUserViewModel;
                        const api = new AccountUsersApi(
                          props.user,
                          props.account.id
                        );
                        api
                          .deleteItem(model)
                          .then()
                          .finally(() => setProcessing(false));
                      }
                    }}
                  >
                    <RemoveCircle />
                  </IconButton>
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </Grid>
        {accountPayments.length === 0 && (
          <Grid item xs={12}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">No upcoming payments found</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        {accountPayments.length !== 0 &&
          accountPayments.map((payment) => {
            const paymentAmount = `$${payment.amount.toFixed(2)}`;
            const paymentDueDate = new Date(payment.dueDate);
            let dueDate = `Due ${paymentDueDate.getDay()}/${paymentDueDate.getMonth()}/${paymentDueDate
              .getFullYear()
              .toString()
              .substr(2, 2)}`;
            if (payment.complete) {
              dueDate = "Paid";
            }
            let paymentAction = "";
            if (!payment.complete) {
              paymentAction = "Make payment";
            }
            return (
              <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6">{payment.name}</Typography>
                    <Typography variant="body1">{dueDate}</Typography>
                    <Typography variant="body1">{paymentAmount}</Typography>
                  </CardContent>
                  <CardActions>
                    <Tooltip title={paymentAction}>
                      <IconButton
                        onClick={() => {
                          if (!payment.complete) {
                            setSelectedPayment(
                              selectedPayment === undefined
                                ? payment
                                : undefined
                            );
                          }
                        }}
                      >
                        {payment.complete && <CheckCircle />}
                        {!payment.complete && <Payment />}
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
                {selectedPayment === payment && !payment.complete && (
                  <MakeTransaction
                    payment={payment}
                    selectedPayment={selectedPayment}
                    setSelectedPayment={setSelectedPayment}
                  />
                )}
              </Grid>
            );
          })}
      </Grid>
      <Status processing={processing} error={error} />
    </Paper>
  );
};
