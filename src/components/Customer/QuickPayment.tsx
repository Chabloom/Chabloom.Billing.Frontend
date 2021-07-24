import * as React from "react";

import { Button, FormGroup, Grid, Paper, TextField, Theme, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";

import { AccountsAPI, AccountViewModel } from "../../api";

import { BillOverview } from "./BillOverview";
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
  const [account, setAccount] = React.useState<AccountViewModel>();
  const [tenantLookupId, setTenantLookupId] = React.useState("");
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState("");

  const classes = useStyles();

  const lookupAccount = async () => {
    setAccount(undefined);
    setError("");
    setProcessing(true);
    const api = new AccountsAPI();
    const success = await api.lookup(tenantLookupId);
    if (success) {
      const ret = api.data() as AccountViewModel;
      if (ret) {
        setAccount(ret);
      }
    } else {
      setError(api.lastError());
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
              lookupAccount().then();
            }}
          >
            <FormGroup>
              <TextField
                required
                variant="standard"
                name="account"
                label="Account Number"
                value={tenantLookupId}
                disabled={processing}
                onChange={(e) => setTenantLookupId(e.target.value)}
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
