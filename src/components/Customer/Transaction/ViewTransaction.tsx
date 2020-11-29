import * as React from "react";

import {
  Backdrop,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@material-ui/core";

import { PaymentViewModel, useStyles } from "../../../types";

interface Props {
  payment: PaymentViewModel | undefined;
}

export const ViewTransaction: React.FC<Props> = (props) => {
  // Initialize classes
  const classes = useStyles();

  // Initialize state variables
  const [open, setOpen] = React.useState(false);

  // Open the backdrop
  React.useEffect(() => {
    console.log(props.payment);
    if (props.payment) {
      setOpen(true);
    }
  }, [props.payment]);

  if (props.payment) {
    return (
      <div>
        <Backdrop className={classes.backdrop} open={open}>
          <Grid
            container
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={12} sm={6} md={4} className={classes.paper}>
              <Card>
                <CardHeader title={`Payment for ${props.payment.name}`} />
                <CardContent></CardContent>
              </Card>
            </Grid>
          </Grid>
        </Backdrop>
      </div>
    );
  }
  return null;
};
