import * as React from "react";
import { Controller, useForm } from "react-hook-form";

import {
  Backdrop,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  InputAdornment,
  TextField,
  Theme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Cleave from "cleave.js/react";

import {
  BillViewModel,
  QuickTransactionApi,
  QuickTransactionViewModel,
} from "../../types";

import { Status } from "../Status";

import amex from "./images/amex.png";
import discover from "./images/discover.png";
import mastercard from "./images/mastercard.png";
import visa from "./images/visa.png";

interface Props {
  payment: BillViewModel;
  selectedPayment: BillViewModel | undefined;
  setSelectedPayment: CallableFunction;
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

export const MakeTransaction: React.FC<Props> = (props) => {
  // Initialize classes
  const classes = useStyles();

  const { handleSubmit, errors, control } = useForm({
    mode: "onChange",
  });

  // Initialize state variables
  const [image, setImage] = React.useState("");
  const [error, setError] = React.useState("");
  const [processing, setProcessing] = React.useState(false);

  const paymentAmount = `$${props.payment.amount.toFixed(2)}`;

  const onSubmit = () => {
    const makeQuickTransaction = async (
      quickTransaction: QuickTransactionViewModel
    ) => {
      setProcessing(true);
      const api = new QuickTransactionApi();
      const [item, err] = await api.addItem(quickTransaction);
      if (!item || err) {
        setError(err);
      }
      setProcessing(false);
    };
    const quickTransaction = {
      paymentId: props.payment.id,
      transactionId: "C46CC466-6B9C-44B2-8DC7-C542A6EE80B9",
    } as QuickTransactionViewModel;
    makeQuickTransaction(quickTransaction).then();
  };

  return (
    <div>
      <Backdrop
        className={classes.backdrop}
        open={props.selectedPayment === props.payment}
      >
        <Grid
          container
          className={classes.paper}
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader title={`Payment for ${props.payment.name}`} />
                <CardContent>
                  <Controller
                    name="cardNumber"
                    control={control}
                    defaultValue=""
                    as={
                      <TextField
                        className={classes.mt1}
                        fullWidth
                        required
                        autoFocus
                        label="Card number"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        error={!!errors.cardNumber}
                        helperText={
                          errors.cardNumber ? errors.cardNumber.message : ""
                        }
                        InputProps={{
                          inputComponent: ({ inputRef, ...props }) => (
                            <Cleave
                              {...props}
                              htmlRef={inputRef}
                              options={{
                                creditCard: true,
                                creditCardStrictMode: true,
                                onCreditCardTypeChanged: (type) => {
                                  if (type === "amex") {
                                    setImage(amex);
                                  } else if (type === "discover") {
                                    setImage(discover);
                                  } else if (type === "mastercard") {
                                    setImage(mastercard);
                                  } else if (type === "visa") {
                                    setImage(visa);
                                  } else {
                                    setImage("");
                                  }
                                },
                              }}
                            />
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              {image && (
                                <img src={image} height="30" alt="issuer" />
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                    }
                  />
                  <Controller
                    name="cardholderName"
                    control={control}
                    defaultValue=""
                    as={
                      <TextField
                        className={classes.mt1}
                        fullWidth
                        required
                        label="Name on card"
                        autoComplete="cc-name"
                        error={!!errors.cardholderName}
                        helperText={
                          errors.cardholderName
                            ? errors.cardholderName.message
                            : ""
                        }
                      />
                    }
                  />
                  <Grid container className={classes.mt1}>
                    <Grid item md={6} sm={12}>
                      <Controller
                        name="expirationMonth"
                        control={control}
                        defaultValue=""
                        as={
                          <TextField
                            fullWidth
                            required
                            label="Expiration month (MM)"
                            inputMode="numeric"
                            autoComplete="cc-exp-month"
                            error={!!errors.expirationMonth}
                            helperText={
                              errors.expirationMonth
                                ? errors.expirationMonth.message
                                : ""
                            }
                            InputProps={{
                              inputComponent: ({ inputRef, ...props }) => (
                                <Cleave
                                  {...props}
                                  htmlRef={inputRef}
                                  options={{ blocks: [2], numericOnly: true }}
                                />
                              ),
                            }}
                          />
                        }
                      />
                    </Grid>
                    <Grid item md={6} sm={12}>
                      <Controller
                        name="expirationYear"
                        control={control}
                        defaultValue=""
                        as={
                          <TextField
                            fullWidth
                            required
                            label="Expiration year (YY)"
                            inputMode="numeric"
                            autoComplete="cc-exp-year"
                            error={!!errors.expirationYear}
                            helperText={
                              errors.expirationYear
                                ? errors.expirationYear.message
                                : ""
                            }
                            InputProps={{
                              inputComponent: ({ inputRef, ...props }) => (
                                <Cleave
                                  {...props}
                                  htmlRef={inputRef}
                                  options={{ blocks: [2], numericOnly: true }}
                                />
                              ),
                            }}
                          />
                        }
                      />
                    </Grid>
                  </Grid>
                  <Controller
                    name="securityCode"
                    control={control}
                    defaultValue=""
                    as={
                      <TextField
                        className={classes.mt1}
                        fullWidth
                        required
                        label={`Security code (${
                          image === amex ? 4 : 3
                        } digits)`}
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        error={!!errors.securityCode}
                        helperText={
                          errors.securityCode ? errors.securityCode.message : ""
                        }
                        InputProps={{
                          inputComponent: ({ inputRef, ...props }) => (
                            <Cleave
                              {...props}
                              htmlRef={inputRef}
                              options={{
                                blocks: [image === amex ? 4 : 3],
                                numericOnly: true,
                              }}
                            />
                          ),
                        }}
                      />
                    }
                  />
                  <ButtonGroup className={classes.mt1} fullWidth>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      {`Pay ${paymentAmount}`}
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      onClick={() => props.setSelectedPayment(undefined)}
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                </CardContent>
              </Card>
            </form>
            <Status processing={processing} error={error} />
          </Grid>
        </Grid>
      </Backdrop>
    </div>
  );
};
