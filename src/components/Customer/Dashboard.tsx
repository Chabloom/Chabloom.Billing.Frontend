import * as React from "react";

import { Grid } from "@material-ui/core";

import { QuickPayment } from "./QuickPayment";
import { UpcomingBills } from "./UpcomingBills";

export const Dashboard: React.FC = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item md={6} xs={12}>
        <QuickPayment />
      </Grid>
      <Grid item md={6} xs={12}>
        <UpcomingBills />
      </Grid>
    </Grid>
  );
};
