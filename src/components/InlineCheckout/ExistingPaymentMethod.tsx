import React from "react";
import { Button, ButtonGroup, Hidden, InputLabel, Select, Theme } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import { CancelOutlined } from "@material-ui/icons";

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
  paymentMethods: Array<PaymentMethodViewModel>;
  selectedPaymentMethod: PaymentMethodViewModel | undefined;
  setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethodViewModel | undefined>>;
  setForceNewPaymentMethod: React.Dispatch<React.SetStateAction<boolean>>;
  processing: boolean;
}

export const ExistingPaymentMethod: React.FC<Props> = ({
  paymentMethods,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  setForceNewPaymentMethod,
  processing,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.mt3}>
      <InputLabel htmlFor="payment-select" className={classes.mt3}>
        Select payment method
      </InputLabel>
      <Select
        className={classes.mt1}
        fullWidth
        native
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
      <div className={classes.mt1}>
        <ButtonGroup fullWidth disabled={processing}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setForceNewPaymentMethod(true);
              setSelectedPaymentMethod(undefined);
            }}
          >
            <CancelOutlined className={classes.mr1} />
            <Hidden smDown implementation="css">
              Use new payment method
            </Hidden>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
