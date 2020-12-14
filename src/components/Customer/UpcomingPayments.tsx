import * as React from "react";

import { User } from "oidc-client";

import { Grid } from "@material-ui/core";

import { AccountViewModel } from "../../types";

import { PaymentOverview } from "./PaymentOverview";

interface Props {
  user: User | undefined;
  trackedAccounts: Array<AccountViewModel>;
  setTrackedAccounts: CallableFunction;
}

export const UpcomingPayments: React.FC<Props> = (props) => {
  if (!props.user) {
    return null;
  }
  return (
    <Grid container spacing={2}>
      {props.trackedAccounts.map((account) => {
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
