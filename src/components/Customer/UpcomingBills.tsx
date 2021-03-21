import * as React from "react";

import { Grid } from "@material-ui/core";

import { BillOverview } from "./BillOverview";
import { useAppContext } from "../../AppContext";

export const UpcomingBills: React.FC = () => {
  const { userToken, trackedAccounts } = useAppContext();

  if (!userToken) {
    return null;
  }

  return (
    <Grid container spacing={2}>
      {trackedAccounts.map((account) => {
        return (
          <Grid item xs={12} key={`upcoming-account-${account.id}`}>
            <BillOverview account={account} allowTracking={false} />
          </Grid>
        );
      })}
    </Grid>
  );
};
