import * as React from "react";

import { Grid } from "@material-ui/core";

import { AccountsAPI, AccountViewModel } from "../../api";

import { BillOverview } from "./BillOverview";
import { useAppContext } from "../../AppContext";
import { Status } from "../Status";

export const UpcomingBills: React.FC = () => {
  const [accounts, setAccounts] = React.useState([] as Array<AccountViewModel>);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState("");

  const { userId, userToken } = useAppContext();

  if (!userId || !userToken) {
    return null;
  }

  // Get all accounts
  React.useEffect(() => {
    const getAccounts = async () => {
      setProcessing(true);
      const api = new AccountsAPI();
      const success = await api.readAll(userId);
      if (success) {
        const ret = api.data() as Array<AccountViewModel>;
        setAccounts(ret);
      } else {
        setError(api.lastError());
      }
      setProcessing(false);
    };
    getAccounts().then();
  }, [userId, userToken]);

  return (
    <Grid container spacing={2}>
      {accounts.map((account) => {
        return (
          <Grid item xs={12} key={`upcoming-account-${account.id}`}>
            <BillOverview account={account} allowTracking={false} />
          </Grid>
        );
      })}
      <Status processing={processing} error={error} />
    </Grid>
  );
};
