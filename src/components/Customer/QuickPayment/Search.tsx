import * as React from "react";

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
  UserService,
  useStyles,
} from "../../../types";

interface Props {
  userService: UserService;
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
  React.useEffect(() => {
    const getTenants = async () => {
      setProcessing(true);
      const api = new TenantsApi(props.userService);
      const [items, err] = await api.readItems();
      if (items && !err) {
        setTenants(items as Array<TenantViewModel>);
      } else {
        setError(err);
      }
      setProcessing(false);
    };
    getTenants().then();
  }, [props.userService]);

  const getTenantAccountNumberPayments = async () => {
    setProcessing(true);
    const selectedTenant = tenants.find((x) => x.name === tenant);
    if (selectedTenant && selectedTenant.id) {
      const api = new PaymentsApi(props.userService, "");
      const [items, err] = await api.readTenantAccount(
        account,
        selectedTenant.id
      );
      if (items && !err) {
        props.setPayments(items as Array<PaymentViewModel>);
      } else {
        setError(err);
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
