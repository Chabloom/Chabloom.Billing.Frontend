import * as React from "react";

import { Grid } from "@material-ui/core";

import { QuickPayment } from "./QuickPayment";
import { UpcomingPayments } from "./UpcomingPayments";

import { UserService } from "../../types";

interface Props {
  userService: UserService;
}

export const Dashboard: React.FC<Props> = (props) => {
  return (
    <Grid container spacing={3} justify="center">
      <QuickPayment {...props} />
      <UpcomingPayments {...props} />
    </Grid>
  );
};
