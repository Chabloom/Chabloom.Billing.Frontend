import * as React from "react";

import {
  Backdrop,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import { PaymentViewModel, useStyles } from "../../../types";

interface Props {
  payment: PaymentViewModel | undefined;
  setPayment: CallableFunction;
}

export const ViewTransaction: React.FC<Props> = (props) => {
  // Initialize classes
  const classes = useStyles();

  // Initialize state variables
  const [open, setOpen] = React.useState(false);

  // Open the backdrop
  React.useEffect(() => {
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
            className={classes.paper}
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={`Payment details for ${props.payment.name}`}
                />
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Amount"
                        secondary={`$${props.payment.amount}`}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemText
                        primary="Due Date"
                        secondary={props.payment.dueDate}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemText
                        primary="Paid"
                        secondary={props.payment.complete ? "Yes" : "No"}
                      />
                    </ListItem>
                  </List>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      props.setPayment(undefined);
                      setOpen(false);
                    }}
                  >
                    Close
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Backdrop>
      </div>
    );
  }
  return null;
};
