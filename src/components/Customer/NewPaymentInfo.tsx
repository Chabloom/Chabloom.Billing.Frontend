import * as React from "react";

import { User } from "oidc-client";

import { Controller, useForm } from "react-hook-form";

import {
  Button,
  ButtonGroup,
  Checkbox,
  createStyles,
  FormControlLabel,
  Grid,
  Hidden,
  InputAdornment,
  TextField,
  Theme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CancelOutlined, CheckCircle } from "@material-ui/icons";

import Cleave from "cleave.js/react";

import { PaymentCardsApi, PaymentCardViewModel } from "../../types";

import amex from "./images/amex.png";
import discover from "./images/discover.png";
import mastercard from "./images/mastercard.png";
import visa from "./images/visa.png";

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
  user: User | undefined;
  paymentCardId: string | undefined;
  setPaymentCardId: CallableFunction;
  savedPayments: Array<PaymentCardViewModel>;
  setSavedPayments: CallableFunction;
  setError: CallableFunction;
  processing: boolean;
  setProcessing: CallableFunction;
}

export const NewPaymentInfo: React.FC<Props> = (props) => {
  // Initialize classes
  const classes = useStyles();

  // Initialize state variables
  const [image, setImage] = React.useState("");
  const [permanent, setPermanent] = React.useState(false);

  const { handleSubmit, errors, control } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    const createPaymentCard = async () => {
      props.setProcessing(true);
      props.setError("");
      const item = {
        name: data.cardName,
        cardNumber: data.cardNumber,
        cardNumberLast4: "0000",
        cardholderName: data.cardholderName,
        expirationMonth: data.expirationMonth,
        expirationYear: data.expirationYear,
        permanent: permanent,
      } as PaymentCardViewModel;
      const api = new PaymentCardsApi(props.user);
      const [ret, err] = await api.addItem(item);
      props.setProcessing(false);
      if (ret) {
        props.setSavedPayments([...props.savedPayments, ret]);
        return ret.id;
      } else {
        props.setError(err);
      }
      return "";
    };
    createPaymentCard().then((selectedPaymentCardId) => {
      if (selectedPaymentCardId) {
        props.setPaymentCardId(selectedPaymentCardId);
      }
    });
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.mt1}>
        <Controller
          name="cardNumber"
          control={control}
          defaultValue=""
          as={
            <TextField
              className={classes.mt1}
              fullWidth
              required
              disabled={props.processing}
              autoFocus
              label="Card number"
              inputMode="numeric"
              autoComplete="cc-number"
              error={!!errors.cardNumber}
              helperText={errors.cardNumber ? errors.cardNumber.message : ""}
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
                    {image && <img src={image} height="30" alt="issuer" />}
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
              disabled={props.processing}
              label="Name on card"
              autoComplete="cc-name"
              error={!!errors.cardholderName}
              helperText={errors.cardholderName ? errors.cardholderName.message : ""}
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
                  disabled={props.processing}
                  label="Expiration month (MM)"
                  inputMode="numeric"
                  autoComplete="cc-exp-month"
                  error={!!errors.expirationMonth}
                  helperText={errors.expirationMonth ? errors.expirationMonth.message : ""}
                  InputProps={{
                    inputComponent: ({ inputRef, ...props }) => (
                      <Cleave {...props} htmlRef={inputRef} options={{ blocks: [2], numericOnly: true }} />
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
                  disabled={props.processing}
                  label="Expiration year (YY)"
                  inputMode="numeric"
                  autoComplete="cc-exp-year"
                  error={!!errors.expirationYear}
                  helperText={errors.expirationYear ? errors.expirationYear.message : ""}
                  InputProps={{
                    inputComponent: ({ inputRef, ...props }) => (
                      <Cleave {...props} htmlRef={inputRef} options={{ blocks: [2], numericOnly: true }} />
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
              disabled={props.processing}
              label={`Security code (${image === amex ? 4 : 3} digits)`}
              inputMode="numeric"
              autoComplete="cc-csc"
              error={!!errors.securityCode}
              helperText={errors.securityCode ? errors.securityCode.message : ""}
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
        {permanent && (
          <Controller
            name="cardName"
            control={control}
            defaultValue=""
            as={
              <TextField
                className={classes.mt1}
                fullWidth
                required={permanent}
                disabled={props.processing}
                label="Saved card name"
                error={!!errors.cardName}
                helperText={errors.cardName ? errors.cardName.message : ""}
              />
            }
          />
        )}
        <FormControlLabel
          control={<Checkbox checked={permanent} onChange={() => setPermanent(!permanent)} name="permanent" />}
          label="Save payment information"
        />
        <ButtonGroup className={classes.mt1} fullWidth disabled={props.processing}>
          <Button variant="contained" color="primary" type="submit">
            <CheckCircle className={classes.mr1} />
            <Hidden smDown implementation="css">
              Use payment method
            </Hidden>
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              props.setPaymentCardId("");
            }}
          >
            <CancelOutlined className={classes.mr1} />
            <Hidden smDown implementation="css">
              Cancel
            </Hidden>
          </Button>
        </ButtonGroup>
      </form>
    </React.Fragment>
  );
};
