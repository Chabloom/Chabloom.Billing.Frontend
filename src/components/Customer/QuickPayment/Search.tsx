import React from "react";

import {
  Button,
  FormGroup,
  LinearProgress,
  TextField,
} from "@material-ui/core";
import { Alert, AlertTitle, Autocomplete } from "@material-ui/lab";

import {
  PaymentsApi,
  PaymentViewModel,
  TenantsApi,
  TenantViewModel,
  useStyles,
} from "../../../types";

interface Props {
  payments: Array<PaymentViewModel>;
  setPayments: CallableFunction;
}

export const Search: React.FC<Props> = (props) => {
  const [tenant, setTenant] = React.useState("");
  const [account, setAccount] = React.useState("");
  const [tenants, setTenants] = React.useState<Array<TenantViewModel>>([]);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState("");

  const classes = useStyles();

  // Get all available tenants
  const getTenants = async () => {
    setProcessing(true);
    const api = new TenantsApi();
    const ret = await api.readItems("");
    if (typeof ret !== "string") {
      setTenants(ret as Array<TenantViewModel>);
    } else {
      setError(ret);
    }
    setProcessing(false);
  };
  React.useEffect(() => {
    getTenants().then();
  }, []);

  const getTenantAccountNumberPayments = async () => {
    setProcessing(true);
    const selectedTenant = tenants.find((x) => x.name === tenant);
    if (selectedTenant && selectedTenant.id) {
      const api = new PaymentsApi("");
      const ret = await api.readTenantAccount(account, selectedTenant.id);
      if (typeof ret !== "string") {
        props.setPayments(ret as Array<PaymentViewModel>);
      } else {
        setError(ret);
      }
    }
    setProcessing(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        getTenantAccountNumberPayments().then();
      }}
    >
      <FormGroup>
        <Autocomplete
          freeSolo
          disableClearable
          options={tenants.map((t) => t.name)}
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
          value={account}
          disabled={processing}
          onChange={(e) => setAccount(e.target.value)}
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
