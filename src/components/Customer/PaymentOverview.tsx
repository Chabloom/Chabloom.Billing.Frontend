import * as React from "react";

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
import { AddCircle, CheckCircle, Payment } from "@material-ui/icons";

import { AccountViewModel, PaymentViewModel } from "../../types";

import { MakeTransaction } from "./MakeTransaction";

interface Props {
  account: AccountViewModel;
  payments: Array<PaymentViewModel>;
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

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item style={{ flexGrow: 1, margin: "auto" }}>
              <Typography variant="h5">{props.account.name}</Typography>
            </Grid>
            {props.allowTracking && (
              <Grid item>
                <Tooltip title="Track account">
                  <IconButton>
                    <AddCircle />
                  </IconButton>
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </Grid>
        {props.payments.map((payment) => {
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
                            selectedPayment === undefined ? payment : undefined
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
    </Paper>
  );
};
