import React from "react";

import { User } from "oidc-client";

import { createStyles, Grid, Paper, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import {
  AccountsApi,
  AccountViewModel,
  PaymentsApi,
  PaymentViewModel,
} from "../../types";

import { PaymentTable } from "./PaymentTable";

interface Props {
  user: User | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  })
);

const getAccounts = async (user: User | undefined) => {
  if (user && !user.expired) {
    const api = new AccountsApi();
    const ret = await api.readItems(user.access_token);
    if (typeof ret !== "string") {
      return ret;
    }
  }
  return [] as Array<AccountViewModel>;
};

const getPayments = async (
  user: User | undefined,
  accounts: Array<AccountViewModel>
) => {
  if (user && !user.expired) {
    const payments = [] as Array<PaymentViewModel>;
    for (const account of accounts) {
      const api = new PaymentsApi(account.id as string);
      const ret = await api.readItems(user.access_token);
      if (typeof ret !== "string") {
        payments.push(...ret);
      }
    }
    return payments;
  }
  return [] as Array<PaymentViewModel>;
};

export const UpcomingPayments: React.FC<Props> = (props) => {
  const [accounts, setAccounts] = React.useState([] as Array<AccountViewModel>);
  const [payments, setPayments] = React.useState([] as Array<PaymentViewModel>);

  const classes = useStyles();

  React.useEffect(() => {
    getAccounts(props.user).then((ret) => setAccounts(ret));
  }, [props.user]);

  React.useEffect(() => {
    getPayments(props.user, accounts).then((ret) => setPayments(ret));
  }, [props.user, accounts]);

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
                  <PaymentTable title={account.name} payments={payments} />
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
