import * as React from "react";

import { Controller, useForm } from "react-hook-form";

import {
  Backdrop,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  FormGroup,
  Grid,
  TextField,
} from "@material-ui/core";

import Cleave from "cleave.js/react";

import {
  PaymentsApi,
  PaymentViewModel,
  TransactionViewModel,
  UserService,
  useStyles,
} from "../../../types";

import { Status } from "../../Status";

interface Props {
  userService: UserService;
  payment: PaymentViewModel | undefined;
  setPayment: CallableFunction;
}

export const MakeTransaction: React.FC<Props> = (props) => {
  // Initialize classes
  const classes = useStyles();

  const { handleSubmit, errors, control } = useForm({
    mode: "onChange",
  });

  // Initialize state variables
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [processing, setProcessing] = React.useState(false);

  // Open the backdrop
  React.useEffect(() => {
    console.log(props.payment);
    if (props.payment) {
      setOpen(true);
    }
  }, [props.payment]);

  const createTransaction = async (transaction: TransactionViewModel) => {
    setProcessing(true);
    if (transaction.id) {
      const paymentsApi = new PaymentsApi(props.userService, "");
      let updatedPayment = props.payment;
      if (updatedPayment) {
        updatedPayment.transaction = transaction.id;
        updatedPayment.complete = true;
        const [, err] = await paymentsApi.editItem(updatedPayment);
        setError(err);
        if (!err) {
          window.location.replace("/");
        }
      }
    }
    setProcessing(false);
  };

  if (props.payment) {
    const onSubmit = (data: any) => {
      const transaction = {
        id: "C46CC466-6B9C-44B2-8DC7-C542A6EE80B9",
        name: props.payment?.name,
        amount: props.payment?.amount,
        currency: props.payment?.currency,
      } as TransactionViewModel;
      createTransaction(transaction).then();
    };

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
              <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                  <CardHeader title={`Payment for ${props.payment.name}`} />
                  <CardContent>
                    <FormGroup>
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
                      <Controller
                        name="cardNumber"
                        control={control}
                        defaultValue=""
                        as={
                          <TextField
                            className={classes.mt1}
                            fullWidth
                            required
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
                                  }}
                                />
                              ),
                            }}
                          />
                        }
                      />
                      <Controller
                        name="expirationMonth"
                        control={control}
                        defaultValue=""
                        as={
                          <TextField
                            className={classes.mt1}
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
                      <Controller
                        name="expirationYear"
                        control={control}
                        defaultValue=""
                        as={
                          <TextField
                            className={classes.mt1}
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
                      <Controller
                        name="securityCode"
                        control={control}
                        defaultValue=""
                        as={
                          <TextField
                            className={classes.mt1}
                            fullWidth
                            required
                            label="Security code"
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            error={!!errors.securityCode}
                            helperText={
                              errors.securityCode
                                ? errors.securityCode.message
                                : ""
                            }
                            InputProps={{
                              inputComponent: ({ inputRef, ...props }) => (
                                <Cleave
                                  {...props}
                                  htmlRef={inputRef}
                                  options={{ blocks: [3], numericOnly: true }}
                                />
                              ),
                            }}
                          />
                        }
                      />
                    </FormGroup>
                    <ButtonGroup className={classes.mt1} fullWidth>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        {`Pay $${props.payment.amount}`}
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          props.setPayment(undefined);
                          setOpen(false);
                        }}
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
  }
  return null;
};
