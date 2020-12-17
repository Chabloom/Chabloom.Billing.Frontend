import * as React from "react";

import { User } from "oidc-client";

import { Grid } from "@material-ui/core";

import { PaymentOverview } from "./PaymentOverview";
import { useAppContext } from "../../AppContext";

export const UpcomingPayments: React.FC = () => {
  const context = useAppContext();
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    context.getUser().then((u) => setUser(u));
  }, [context.userLoaded]);

  if (!user) {
    return null;
  }

  return (
    <Grid container spacing={2}>
      {context.trackedAccounts.map((account) => {
        return (
          <Grid item xs={12}>
            <PaymentOverview account={account} allowTracking={false} />
          </Grid>
        );
      })}
    </Grid>
  );
};
