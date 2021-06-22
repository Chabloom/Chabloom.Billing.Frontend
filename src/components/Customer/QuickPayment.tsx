import * as React from "react";

import { Button, createStyles, FormGroup, Grid, Paper, TextField, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { UserAccountsAPI, UserAccountViewModel } from "../../api";

import { BillOverview } from "./BillOverview";
import { useAppContext } from "../../AppContext";
import { Status } from "../Status";

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

export const QuickPayment: React.FC = () => {
  const [account, setAccount] = React.useState<UserAccountViewModel>();
  const [accountNumber, setAccountNumber] = React.useState("");
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState("");

  const classes = useStyles();

  const { tenant } = useAppContext();

  const getAccountPayments = async () => {
    setAccount(undefined);
    setError("");
    setProcessing(true);
    if (tenant) {
      const api = new UserAccountsAPI();
      const success = await api.readAll("");
      if (success) {
        const ret = api.data() as Array<UserAccountViewModel>;
        const acc = ret.find((x) => x.accountId == accountNumber);
        if (acc) {
          setAccount(acc);
        }
      } else {
        setError(api.lastError());
      }
    }
    setProcessing(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h5">Account Search</Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              getAccountPayments().then();
            }}
          >
            <FormGroup>
              <TextField
                required
                variant="standard"
                name="account"
                label="Account Number"
                value={accountNumber}
                disabled={processing}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </FormGroup>
            <Button
              fullWidth
              className={classes.mt1}
              variant="contained"
              color="primary"
              type="submit"
              disabled={processing}
            >
              Search
            </Button>
          </form>
          <Status processing={processing} error={error} />
        </Paper>
      </Grid>
      {account && (
        <Grid item xs={12}>
          <BillOverview account={account} allowTracking={true} />
        </Grid>
      )}
    </Grid>
  );
};
