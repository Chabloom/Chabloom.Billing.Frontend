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
      {userAccounts.map((userAccount) => {
        return (
          <Grid item xs={12} key={`upcoming-account-${userAccount.accountId}`}>
            <BillOverview userAccount={userAccount} allowTracking={false} />
          </Grid>
        );
      })}
    </Grid>
  );
};
