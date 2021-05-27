import * as React from "react";
import {
  Backdrop,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  createStyles,
  FormControlLabel,
  Grid,
  Hidden,
  Theme,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CancelOutlined, CheckCircle } from "@material-ui/icons";

import { PaymentsApi, PaymentViewModel, PaymentMethodViewModel } from "../../checkout";
import { Status } from "../../common";
import { BillViewModel } from "../../api";

import { useAppContext } from "../../AppContext";
import { InlineCheckout } from "../InlineCheckout";

interface Props {
  bill: BillViewModel;
  selectedBill: BillViewModel | undefined;
  setSelectedBill: CallableFunction;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
    mr1: {
      marginRight: theme.spacing(1),
    },
    mt1: {
      marginTop: theme.spacing(1),
    },
    backdrop: {
      zIndex: theme.zIndex.tooltip + 1,
      color: "#fff",
    },
  })
);

export const MakePayment: React.FC<Props> = (props) => {
  // Initialize classes
  const classes = useStyles();

  // Initialize state variables
  const [agreed, setAgreed] = React.useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<PaymentMethodViewModel>();
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState("");

  const { userToken } = useAppContext();

  const makeTransaction = async () => {
    if (!selectedPaymentMethod) {
      setError("No payment method selected");
      return;
    }

    setProcessing(true);
    setError("");
    const payment = {
      name: props.bill.name,
      amount: props.bill.amount,
      currencyId: "USD",
    } as PaymentViewModel;
    if (selectedPaymentMethod.id) {
      payment.paymentCardId = selectedPaymentMethod.id;
    } else {
      payment.cardHolderName = selectedPaymentMethod.cardHolderName;
      payment.cardType = selectedPaymentMethod.cardType;
      payment.cardNumber = selectedPaymentMethod.cardNumber;
      payment.cardExpirationMonth = selectedPaymentMethod.cardExpirationMonth;
      payment.cardExpirationYear = selectedPaymentMethod.cardExpirationYear;
      payment.cardSecurityCode = "";
    }
    const api = new PaymentsApi();
    const [_, ret, err] = await api.create(userToken, payment);
    setProcessing(false);
    if (ret) {
      return ret.id;
    } else {
      setError(err);
    }
    return "";
  };
  const completeTransaction = async () => {
    if (selectedPaymentMethod) {
      const transactionId = await makeTransaction();
      if (transactionId) {
        //await makeQuickTransaction(transactionId);
        props.setSelectedBill(undefined);
      }
    }
  };

  const billAmount = `$${props.bill.amount.toFixed(2)}`;
  const billDueDate = new Date(props.bill.dueDate);
  const dueDate = `Due ${billDueDate.toLocaleDateString()}`;

  return (
    <React.Fragment>
      <Backdrop
        className={classes.backdrop}
        open={props.selectedBill === props.bill}
        onClick={() => props.setSelectedBill(undefined)}
      >
        <Grid
          container
          className={classes.paper}
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12} sm={8} md={4}>
            <Card onClick={(e) => e.stopPropagation()}>
              <CardHeader title="Manage payment" />
              <CardContent>
                <Typography variant="h6">{props.bill.name}</Typography>
                <Typography variant="body1">{dueDate}</Typography>
                <Typography variant="body1">{billAmount}</Typography>
                <InlineCheckout
                  selectedPaymentMethod={selectedPaymentMethod}
                  setSelectedPaymentMethod={setSelectedPaymentMethod}
                />
                {selectedPaymentMethod && (
                  <FormControlLabel
                    className={classes.mt1}
                    control={<Checkbox checked={agreed} onChange={() => setAgreed(!agreed)} />}
                    label="I agree to the terms and conditions"
                  />
                )}
              </CardContent>
              {selectedPaymentMethod && (
                <CardActionArea>
                  <CardActions>
                    <ButtonGroup fullWidth disabled={processing}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          completeTransaction().then();
                        }}
                        disabled={!agreed}
                      >
                        <CheckCircle className={classes.mr1} />
                        <Hidden smDown implementation="css">
                          Complete
                        </Hidden>
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => setSelectedPaymentMethod(undefined)}>
                        <CancelOutlined className={classes.mr1} />
                        <Hidden smDown implementation="css">
                          Cancel
                        </Hidden>
                      </Button>
                    </ButtonGroup>
                  </CardActions>
                </CardActionArea>
              )}
              <Status processing={processing} error={error} />
            </Card>
          </Grid>
        </Grid>
      </Backdrop>
    </React.Fragment>
  );
};
