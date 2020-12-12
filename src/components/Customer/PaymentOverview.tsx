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
import { Info, Payment } from "@material-ui/icons";

import { AccountViewModel, PaymentViewModel } from "../../types";

interface Props {
  account: AccountViewModel;
  payments: Array<PaymentViewModel>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  })
);

export const PaymentOverview: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">{props.account.name}</Typography>
        </Grid>
        {props.payments.map((payment) => {
          let paymentAmount = `$${payment.amount.toFixed(2)}`;
          let paymentAction = "Make payment";
          if (payment.complete) {
            paymentAction = "View payment details";
          }
          return (
            <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6">{payment.name}</Typography>
                  <Typography variant="body1">{paymentAmount}</Typography>
                </CardContent>
                <CardActions>
                  <Tooltip title={paymentAction}>
                    <IconButton>
                      <Payment />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Bill information">
                    <IconButton>
                      <Info />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};
