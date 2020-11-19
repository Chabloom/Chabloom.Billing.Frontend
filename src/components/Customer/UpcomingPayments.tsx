import React from "react";

import { User } from "oidc-client";

import { Grid, Paper } from "@material-ui/core";

import {
  AccountsApi,
  AccountViewModel,
  PaymentsApi,
  PaymentViewModel,
  useStyles,
} from "../../types";

import { PaymentTable } from "./PaymentTable";
import { UserService } from "../UserService";

interface Props {
  userService: UserService;
}

export const UpcomingPayments: React.FC<Props> = (props) => {
  const [user, setUser] = React.useState<User>();
  const [accounts, setAccounts] = React.useState([] as Array<AccountViewModel>);
  const [payments, setPayments] = React.useState([] as Array<PaymentViewModel>);

  const classes = useStyles();

  const getUser = async () => {
    const u = await props.userService.getUser(false);
    if (u) {
      setUser(u);
    }
  };
  React.useEffect(() => {
    getUser().then();
  }, []);

  const getAccounts = async () => {
    if (user) {
      const api = new AccountsApi();
      const ret = await api.readItems(user.access_token);
      if (typeof ret !== "string") {
        setAccounts(ret);
      }
    }
  };
  React.useEffect(() => {
    getAccounts().then();
  }, [user]);

  const getPayments = async () => {
    if (user) {
      const payments = [] as Array<PaymentViewModel>;
      for (const account of accounts) {
        const api = new PaymentsApi(account.id as string);
        const ret = await api.readItems(user.access_token);
        if (typeof ret !== "string") {
          payments.push(...ret);
        }
      }
      setPayments(payments);
    }
  };
  React.useEffect(() => {
    getPayments().then();
  }, [user, accounts]);

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
