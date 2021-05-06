import * as React from "react";
import { Button, ButtonGroup, createStyles, Hidden, InputLabel, Select, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AddCircle, CheckCircle } from "@material-ui/icons";

import { PaymentCardViewModel } from "../../checkout";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mr1: {
      marginRight: theme.spacing(1),
    },
    mt1: {
      marginTop: theme.spacing(1),
    },
    mt3: {
      marginTop: theme.spacing(3),
    },
  })
);

interface Props {
  setPaymentCardId: CallableFunction;
  savedPayments: Array<PaymentCardViewModel>;
  processing: boolean;
}

export const SavedPaymentInfo: React.FC<Props> = (props) => {
  // Initialize classes
  const classes = useStyles();

  // Initialize state variables
  const [selectedPaymentCardId, setSelectedPaymentCardId] = React.useState("");

  const getSavedPaymentCardLast4 = (savedPaymentCard: PaymentCardViewModel): string => {
    if (savedPaymentCard && savedPaymentCard.cardNumberLast4) {
      return savedPaymentCard.cardNumberLast4;
    }
    return "0000";
  };

  return (
    <React.Fragment>
      <InputLabel htmlFor="payment-select" className={classes.mt3}>
        Select saved payment method
      </InputLabel>
      <Select
        className={classes.mt1}
        native
        fullWidth
        disabled={props.processing}
        inputProps={{ id: "payment-select" }}
        onChange={(e) => {
          e.preventDefault();
          setSelectedPaymentCardId(e.target.value as string);
        }}
      >
        <option value="" />
        {props.savedPayments.map((payment) => {
          return (
            <option key={`saved-payment-${payment.id}`} value={payment.id}>{`${
              payment.name
            } ending in ${getSavedPaymentCardLast4(payment)}`}</option>
          );
        })}
      </Select>
      <ButtonGroup className={classes.mt1} fullWidth disabled={props.processing}>
        {selectedPaymentCardId && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              props.setPaymentCardId(selectedPaymentCardId);
            }}
          >
            <CheckCircle className={classes.mr1} />
            <Hidden smDown implementation="css">
              Use saved payment method
            </Hidden>
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            props.setPaymentCardId("new");
          }}
        >
          <AddCircle className={classes.mr1} />
          <Hidden smDown implementation="css">
            Create new payment method
          </Hidden>
        </Button>
      </ButtonGroup>
    </React.Fragment>
  );
};
