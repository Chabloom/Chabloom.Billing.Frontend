import * as React from "react";

import { User } from "oidc-client";

import { Grid } from "@material-ui/core";

import {
  AccountsApi,
  AccountViewModel,
  PaymentsApi,
  PaymentViewModel,
} from "../../types";

import { PaymentOverview } from "./PaymentOverview";

interface Props {
  user: User | undefined;
}

export const UpcomingPayments: React.FC<Props> = (props) => {
  const [accounts, setAccounts] = React.useState([] as Array<AccountViewModel>);
  const [payments, setPayments] = React.useState([] as Array<PaymentViewModel>);

  React.useEffect(() => {
    const getItems = async () => {
      const api = new AccountsApi(props.user);
      const [items, err] = await api.readItems();
      if (items && !err) {
        setAccounts(items);
      }
    };
    getItems().then();
  }, [props.user]);

  React.useEffect(() => {
    const getItems = async () => {
      const payments = [] as Array<PaymentViewModel>;
      for (const account of accounts) {
        const api = new PaymentsApi(props.user, account.id as string);
        const [items, err] = await api.readItems();
        if (items && !err) {
          payments.push(...items);
        }
      }
      setPayments(payments);
    };
    getItems().then();
  }, [props.user, accounts]);

  if (!props.user) {
    return null;
  }
  return (
    <Grid container spacing={2}>
      {accounts.map((account) => {
        const accountPayments = payments
          .filter((x) => x.account === account.id)
          .filter((x) => new Date(x.dueDate) > new Date());
        if (accountPayments.length !== 0) {
          return (
            <Grid item xs={12}>
              <PaymentOverview account={account} payments={accountPayments} />
            </Grid>
          );
        }
        return null;
      })}
    </Grid>
  );
};
