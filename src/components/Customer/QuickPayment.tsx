import * as React from "react";

import {
  Autocomplete,
  Button,
  createStyles,
  FormGroup,
  Grid,
  Paper,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { AccountsApi, AccountViewModel, TenantsApi, TenantViewModel } from "../../types";

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
  const [allTenants, setAllTenants] = React.useState<Array<TenantViewModel>>([]);
  const [tenant, setTenant] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState("");

  const classes = useStyles();

  // Get all available tenants
  React.useEffect(() => {
    setProcessing(true);
    setError("");
    const api = new TenantsApi();
    api
      .readItems()
      .then(([ret, err]) => {
        if (ret) {
          setAllTenants(ret);
        } else {
          setError(err);
        }
      })
      .finally(() => setProcessing(false));
  }, []);

  const getAccountPayments = async () => {
    setAccount(undefined);
    setError("");
    setProcessing(true);
    const selectedTenant = allTenants.find((x) => x.name === tenant);
    if (selectedTenant) {
      const accountsApi = new AccountsApi(selectedTenant.id);
      const [account, err] = await accountsApi.readItemReference("", accountNumber);
      if (account) {
        setAccount(account);
      } else {
        setError(err);
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
              <Autocomplete
                freeSolo
                disableClearable
                options={allTenants.map((t) => t.name)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    variant="standard"
                    name="tenant"
                    label="Tenant"
                    value={tenant}
                    disabled={processing}
                    onChange={(e) => setTenant(e.target.value)}
                  />
                )}
                onChange={(event, value) => setTenant(value)}
              />
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
