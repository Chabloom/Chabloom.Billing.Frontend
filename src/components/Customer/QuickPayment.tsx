import * as React from "react";

import { User } from "oidc-client";

import {
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

import {
  AccountsApi,
  AccountViewModel,
  TenantsApi,
  TenantViewModel,
} from "../../types";

import { PaymentOverview } from "./PaymentOverview";
import { Autocomplete } from "@material-ui/lab";
import { Status } from "../Status";

interface Props {
  user: User | undefined;
}

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

export const QuickPayment: React.FC<Props> = (props) => {
  const [account, setAccount] = React.useState<AccountViewModel>();
  const [allTenants, setAllTenants] = React.useState<Array<TenantViewModel>>(
    []
  );
  const [tenant, setTenant] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState("");

  const classes = useStyles();

  // Get all available tenants
  React.useEffect(() => {
    const getTenants = async () => {
      setProcessing(true);
      const api = new TenantsApi();
      const [items, err] = await api.readItems();
      if (items && !err) {
        setAllTenants(items);
      } else {
        setError(err);
      }
      setProcessing(false);
    };
    getTenants().then();
  }, [props.user]);

  const getAccountPayments = async () => {
    setProcessing(true);
    const selectedTenant = allTenants.find((x) => x.name === tenant);
    if (selectedTenant) {
      const accountsApi = new AccountsApi(undefined, selectedTenant.id);
      const [account, err] = await accountsApi.readItemReference(accountNumber);
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
              Get Bills
            </Button>
          </form>
          <Status processing={processing} error={error} />
        </Paper>
      </Grid>
      {account && (
        <Grid item xs={12}>
          <PaymentOverview {...props} account={account} allowTracking={true} />
        </Grid>
      )}
    </Grid>
  );
};
