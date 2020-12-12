import * as React from "react";

import { User } from "oidc-client";

import { Grid } from "@material-ui/core";

import { QuickPayment } from "./QuickPayment";
import { UpcomingPayments } from "./UpcomingPayments";

interface Props {
  user: User | undefined;
}

export const Dashboard: React.FC<Props> = (props) => {
  return (
    <Grid container spacing={3} justify="center">
      <Grid item md={6} xs={12}>
        <QuickPayment {...props} />
      </Grid>
      <Grid item md={6} xs={12}>
        <UpcomingPayments {...props} />
      </Grid>
    </Grid>
  );
};
