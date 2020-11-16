import React from "react";

import { User } from "oidc-client";

import {
  Button,
  createStyles,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import {
  AccountsApi,
  AccountViewModel,
  ApplicationConfig,
  PaymentsApi,
  PaymentViewModel,
} from "../../../../types";

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

const guidEmpty = "00000000-0000-0000-0000-000000000000";

const QuickViewTableHead: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Amount</TableCell>
        <TableCell>Due Date</TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
  );
};

const QuickViewTableBody: React.FC<{ payments: Array<PaymentViewModel> }> = (
  props
) => {
  const classes = useStyles();

  return (
    <TableBody>
      {props.payments.map((payment) => {
        if (new Date(payment.dueDate) < new Date()) {
          return null;
        }
        return (
          <TableRow hover key={payment.id}>
            <TableCell>{payment.name}</TableCell>
            <TableCell>{`$${payment.amount.toFixed(2)}`}</TableCell>
            <TableCell>
              {new Date(payment.dueDate).toLocaleDateString()}
            </TableCell>
            {payment.transactionSchedule !== guidEmpty && (
              <Button
                className={classes.mt1}
                variant="contained"
                color="primary"
                href={`${ApplicationConfig.paymentsApiPublicAddress}
              /transactionSchedule/${payment.transactionSchedule}
              ?redirectUri=${window.location.pathname}`}
              >
                View Payment Schedule
              </Button>
            )}
            {payment.transaction !== guidEmpty && (
              <Button
                className={classes.mt1}
                variant="contained"
                color="primary"
                href={`${ApplicationConfig.paymentsApiPublicAddress}
              /transaction/${payment.transaction}
              ?redirectUri=${window.location.pathname}`}
              >
                View Payment
              </Button>
            )}
            {payment.transaction === guidEmpty && (
              <Button
                className={classes.mt1}
                variant="contained"
                color="primary"
                onClick={() => {
                  const href = `${ApplicationConfig.paymentsApiPublicAddress}/transaction?name=${payment.name}&amount=${payment.amount}&redirectUri=${window.location.pathname}`;
                  window.location.replace(href);
                }}
              >
                Manage Payment
              </Button>
            )}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export const QuickView: React.FC<Props> = (props) => {
  const [accounts, setAccounts] = React.useState([] as Array<AccountViewModel>);
  const [payments, setPayments] = React.useState([] as Array<PaymentViewModel>);

  const classes = useStyles();

  React.useEffect(() => {
    if (props.user && !props.user.expired) {
      const api = new AccountsApi();
      api.readItems(props.user.access_token).then((ret) => {
        if (typeof ret !== "string") {
          setAccounts(ret);
          ret.forEach((account) => {
            const api = new PaymentsApi(account.id as string);
            api.readItems(props.user?.access_token).then((ret) => {
              if (typeof ret !== "string") {
                setPayments((p) => [...p, ...ret]);
              }
            });
          });
        }
      });
    }
  }, [props.user]);

  return (
    <Grid item md={6} xs={12}>
      <Grid container spacing={2}>
        {accounts.map((account) => {
          const accountPayments = payments
            .filter((x) => x.account === account.id)
            .filter((x) => new Date(x.dueDate) > new Date());
          if (accountPayments.length !== 0) {
            return (
              <Grid item xs={12}>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="subtitle2">{account.name}</Typography>
                  <Table>
                    <QuickViewTableHead />
                    <QuickViewTableBody payments={accountPayments} />
                  </Table>
                </Paper>
              </Grid>
            );
          }
          return null;
        })}
      </Grid>
    </Grid>
  );
};
