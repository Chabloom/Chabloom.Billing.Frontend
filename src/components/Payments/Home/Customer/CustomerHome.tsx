import React from "react";

import { User } from "oidc-client";

import { Grid } from "@material-ui/core";

import { TenantViewModel } from "../../../../types";

import { QuickPay } from "./QuickPay";
import { QuickView } from "./QuickView";

interface Props {
  user: User | undefined;
  allTenants: Array<TenantViewModel>;
}

export const CustomerHome: React.FC<Props> = (props) => {
  return (
    <Grid container spacing={3} justify="center">
      <QuickPay {...props} />
      {props.user && <QuickView {...props} />}
    </Grid>
  );
};
