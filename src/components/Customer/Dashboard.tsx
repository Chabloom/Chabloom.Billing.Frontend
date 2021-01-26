import * as React from "react";

import { Grid } from "@material-ui/core";

import { QuickPayment } from "./QuickPayment";
import { UpcomingPayments } from "./UpcomingPayments";

export const Dashboard: React.FC = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item md={6} xs={12}>
        <QuickPayment />
      </Grid>
      <Grid item md={6} xs={12}>
        <UpcomingPayments />
      </Grid>
    </Grid>
  );
};
