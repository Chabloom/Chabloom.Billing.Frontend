import * as React from "react";

import { User } from "oidc-client";

import {
  Button,
  createStyles,
  FormGroup,
  LinearProgress,
  TextField,
  Theme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle, Autocomplete } from "@material-ui/lab";

import {
  AccountsApi,
  PaymentsApi,
  PaymentViewModel,
  TenantsApi,
  TenantViewModel,
} from "../../types";

interface Props {
  user: User | undefined;
  payments: Array<PaymentViewModel>;
  setPayments: CallableFunction;
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

export const QuickPaymentSearch: React.FC<Props> = (props) => {
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
    if (selectedTenant && selectedTenant.id) {
      const accountsApi = new AccountsApi();
      const [account, accountErr] = await accountsApi.readItemReference(
        accountNumber
      );
      if (!account || accountErr) {
        setError(accountErr);
        return;
      }
      const paymentsApi = new PaymentsApi(undefined, account.id);
      const [payments, paymentsErr] = await paymentsApi.readItems();
      if (!payments || paymentsErr) {
        setError(paymentsErr);
        return;
      }
      const accountPayments = payments.filter(
        (x) => new Date(x.dueDate) > new Date()
      );
      props.setPayments(accountPayments as Array<PaymentViewModel>);
    }
    setProcessing(false);
  };

  return (
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
      {error && (
        <Alert className={classes.mt1} severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      {processing && <LinearProgress className={classes.mt1} />}
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
  );
};
