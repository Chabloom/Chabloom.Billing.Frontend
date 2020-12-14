import * as React from "react";

import { User } from "oidc-client";

import { Grid } from "@material-ui/core";

import { AccountsApi, AccountViewModel } from "../../types";

import { PaymentOverview } from "./PaymentOverview";

interface Props {
  user: User | undefined;
}

export const UpcomingPayments: React.FC<Props> = (props) => {
  const [accounts, setAccounts] = React.useState([] as Array<AccountViewModel>);

  // Get all accounts the user is authorized to view
  React.useEffect(() => {
    const getItems = async () => {
      const api = new AccountsApi(props.user);
      const [items, err] = await api.readItemsAuthorized();
      if (items && !err) {
        setAccounts(items);
      }
    };
    getItems().then();
  }, [props.user]);

  if (!props.user) {
    return null;
  }
  return (
    <Grid container spacing={2}>
      {accounts.map((account) => {
        return (
          <Grid item xs={12}>
            <PaymentOverview
              {...props}
              account={account}
              allowTracking={false}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
