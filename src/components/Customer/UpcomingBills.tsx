import * as React from "react";

import { Grid } from "@material-ui/core";

import { BillOverview } from "./BillOverview";
import { useAppContext } from "../../AppContext";

export const UpcomingBills: React.FC = () => {
  const { userToken, userAccounts } = useAppContext();

  if (!userToken || !userAccounts) {
    return null;
  }

  return (
    <Grid container spacing={2}>
      {userAccounts.map((account) => {
        return (
          <Grid item xs={12} key={`upcoming-account-${account.id}`}>
            <BillOverview account={account} allowTracking={false} />
          </Grid>
        );
      })}
    </Grid>
  );
};
