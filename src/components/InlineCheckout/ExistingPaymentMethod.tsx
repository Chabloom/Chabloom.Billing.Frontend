import React from "react";
import { createStyles, InputLabel, Select, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { PaymentCardViewModel } from "../../checkout";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mt1: {
      marginTop: theme.spacing(1),
    },
    mt3: {
      marginTop: theme.spacing(3),
    },
  })
);

interface Props {
  paymentMethods: Array<PaymentCardViewModel>;
  selectedPaymentMethod: PaymentCardViewModel | undefined;
  setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<PaymentCardViewModel | undefined>>;
  processing: boolean;
}

export const ExistingPaymentMethod: React.FC<Props> = ({
  paymentMethods,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  processing,
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <InputLabel htmlFor="payment-select" className={classes.mt3}>
        Select saved payment method
      </InputLabel>
      <Select
        className={classes.mt1}
        fullWidth
        disabled={processing}
        inputProps={{ id: "payment-select" }}
        onChange={(e) => {
          e.preventDefault();
          setSelectedPaymentMethod(paymentMethods.find((x) => x.id == e.target.value));
        }}
      >
        <option value="" />
        {paymentMethods.map((payment) => {
          const name = `${payment.name} ending in ${payment.cardNumberLast4}`;
          return (
            <option key={payment.id} value={payment.id} selected={payment.id === selectedPaymentMethod?.id}>
              {name}
            </option>
          );
        })}
      </Select>
    </React.Fragment>
  );
};
