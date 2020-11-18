import React from "react";

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
      <QuickPayment {...props} />
      {props.user && <UpcomingPayments {...props} />}
    </Grid>
  );
};
