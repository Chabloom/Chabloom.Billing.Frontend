import * as React from "react";

import { User } from "oidc-client";

import { Grid } from "@material-ui/core";

import { QuickPayment } from "./QuickPayment";
import { UpcomingPayments } from "./UpcomingPayments";
import { AccountsApi, AccountViewModel } from "../../types";

interface Props {
  user: User | undefined;
}

export const Dashboard: React.FC<Props> = (props) => {
  const [trackedAccounts, setTrackedAccounts] = React.useState([] as Array<AccountViewModel>);

  // Get all accounts the user is tracking
  React.useEffect(() => {
    const getItems = async () => {
      const api = new AccountsApi(props.user);
      const [items, err] = await api.readItemsAuthorized();
      if (items && !err) {
        setTrackedAccounts(items);
      }
    };
    getItems().then();
  }, [props.user]);

  return (
    <Grid container spacing={3} justify="center">
      <Grid item md={6} xs={12}>
        <QuickPayment {...props} trackedAccounts={trackedAccounts} setTrackedAccounts={setTrackedAccounts} />
      </Grid>
      <Grid item md={6} xs={12}>
        <UpcomingPayments {...props} trackedAccounts={trackedAccounts} setTrackedAccounts={setTrackedAccounts} />
      </Grid>
    </Grid>
  );
};
