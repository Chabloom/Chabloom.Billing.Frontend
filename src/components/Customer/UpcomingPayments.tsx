import * as React from "react";

import { User } from "oidc-client";

import { createStyles, Grid, Paper, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import {
  AccountsApi,
  AccountViewModel,
  PaymentsApi,
  PaymentViewModel,
  UserService,
} from "../../types";

import { PaymentTable } from "./PaymentTable";

interface Props {
  userService: UserService;
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

export const UpcomingPayments: React.FC<Props> = (props) => {
  const [user, setUser] = React.useState<User>();
  const [accounts, setAccounts] = React.useState([] as Array<AccountViewModel>);
  const [payments, setPayments] = React.useState([] as Array<PaymentViewModel>);

  const classes = useStyles();

  React.useEffect(() => {
    const getUser = async () => {
      const u = await props.userService.getUser(false);
      if (u) {
        setUser(u);
      }
    };
    getUser().then();
  }, [props.userService]);

  React.useEffect(() => {
    const getItems = async () => {
      if (user) {
        const api = new AccountsApi(props.userService);
        const [items, err] = await api.readItems();
        if (items && !err) {
          setAccounts(items);
        }
      }
    };
    getItems().then();
  }, [props.userService, user]);

  React.useEffect(() => {
    const getItems = async () => {
      if (user) {
        const payments = [] as Array<PaymentViewModel>;
        for (const account of accounts) {
          const api = new PaymentsApi(props.userService, account.id as string);
          const [items, err] = await api.readItems();
          if (items && !err) {
            payments.push(...items);
          }
        }
        setPayments(payments);
      }
    };
    getItems().then();
  }, [props.userService, user, accounts]);

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
                  <PaymentTable
                    {...props}
                    title={account.name}
                    payments={accountPayments}
                  />
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
