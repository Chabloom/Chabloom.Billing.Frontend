import React from "react";
import { Button, ButtonGroup, createStyles, InputAdornment, TextField, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { PaymentMethodsApi, PaymentMethodViewModel, useAppContext } from "../../checkout";

import amex from "../../checkout/images/amex.png";
import visa from "../../checkout/images/visa.png";
import mastercard from "../../checkout/images/mastercard.png";
import discover from "../../checkout/images/discover.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
    },
    mt1: {
      marginTop: theme.spacing(1),
    },
    mt3: {
      marginTop: theme.spacing(3),
    },
    flex: {
      display: "flex",
    },
    flexGrow: {
      flexGrow: 1,
      margin: "auto",
    },
  })
);

interface Props {
  setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethodViewModel[] | undefined>>;
  setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethodViewModel | undefined>>;
  setForceNewPaymentMethod: React.Dispatch<React.SetStateAction<boolean>>;
  processing: boolean;
  setProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export const NewPaymentMethod: React.FC<Props> = ({
  setPaymentMethods,
  setSelectedPaymentMethod,
  setForceNewPaymentMethod,
  processing,
  setProcessing,
  setError,
}) => {
  const classes = useStyles();
  const { userId, userToken } = useAppContext();
  const [cardType, setCardType] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardHolderName, setCardHolderName] = React.useState("");
  const [cardExpiration, setCardExpiration] = React.useState("");
  const [cardSecurityCode, setCardSecurityCode] = React.useState("");
  const [cardImage, setCardImage] = React.useState("");

  const createPaymentMethod = async (paymentMethod: PaymentMethodViewModel) => {
    setProcessing(true);
    setError("");
    const api = new PaymentMethodsApi();
    const [_, ret, err] = await api.create(userToken, paymentMethod);
    if (ret && !err) {
      setPaymentMethods([paymentMethod]);
      setSelectedPaymentMethod(paymentMethod);
    } else {
      setError(err);
    }
    setProcessing(false);
  };

  return (
    <div className={classes.mt3}>
      <Typography variant="h6">New Payment Method</Typography>
      <Typography variant="subtitle1">All payments are secure and encrypted</Typography>
      <form
        className={classes.root}
        onSubmit={(e) => {
          e.preventDefault();
          const exp = cardExpiration.split("/");
          const expMonth = parseInt(exp[0].trim());
          const expYear = parseInt(exp[1].trim());
          const paymentMethod = {
            name: cardType.toUpperCase(),
            cardHolderName: cardHolderName,
            cardType: cardType,
            cardNumber: cardNumber,
            cardExpirationMonth: expMonth,
            cardExpirationYear: expYear,
          } as PaymentMethodViewModel;
          if (userId) {
            createPaymentMethod(paymentMethod).then();
          }
          setPaymentMethods([paymentMethod]);
          setSelectedPaymentMethod(paymentMethod);
          setForceNewPaymentMethod(false);
        }}
      >
        <div>
          <TextField
            fullWidth
            required
            inputMode="numeric"
            autoComplete="cc-number"
            value={cardNumber}
            disabled={processing}
            onChange={(e) => {
              const number = e.target.value.replaceAll(/[^0-9]+/g, "");
              if (number.startsWith("34") || number.startsWith("37")) {
                setCardType("amex");
                setCardImage(amex);
                // Use 4-6-5 format
                const sub1 = `${number.substring(0, 1)}${number.substring(1, 2)}${number.substring(
                  2,
                  3
                )}${number.substring(3, 4)}`;
                const sub2 = `${number.substring(4, 5)}${number.substring(5, 6)}${number.substring(
                  6,
                  7
                )}${number.substring(7, 8)}${number.substring(8, 9)}${number.substring(9, 10)}`;
                const sub3 = `${number.substring(10, 11)}${number.substring(11, 12)}${number.substring(
                  12,
                  13
                )}${number.substring(13, 14)}${number.substring(14, 15)}`;
                if (sub3) {
                  setCardNumber(`${sub1} ${sub2} ${sub3}`);
                } else if (sub2) {
                  setCardNumber(`${sub1} ${sub2}`);
                } else {
                  setCardNumber(sub1);
                }
                return;
              } else if (number.startsWith("4")) {
                setCardType("visa");
                setCardImage(visa);
              } else if (number.startsWith("5")) {
                setCardType("mastercard");
                setCardImage(mastercard);
              } else if (number.startsWith("6")) {
                setCardType("discover");
                setCardImage(discover);
              } else {
                // Unknown card type
                setCardType("");
                setCardNumber(number.substring(0, 16));
                return;
              }
              // Use 4-4-4-4 format
              const sub1 = `${number.substring(0, 1)}${number.substring(1, 2)}${number.substring(
                2,
                3
              )}${number.substring(3, 4)}`;
              const sub2 = `${number.substring(4, 5)}${number.substring(5, 6)}${number.substring(
                6,
                7
              )}${number.substring(7, 8)}`;
              const sub3 = `${number.substring(8, 9)}${number.substring(9, 10)}${number.substring(
                10,
                11
              )}${number.substring(11, 12)}`;
              const sub4 = `${number.substring(12, 13)}${number.substring(13, 14)}${number.substring(
                14,
                15
              )}${number.substring(15, 16)}`;
              if (sub4) {
                setCardNumber(`${sub1} ${sub2} ${sub3} ${sub4}`);
              } else if (sub3) {
                setCardNumber(`${sub1} ${sub2} ${sub3}`);
              } else if (sub2) {
                setCardNumber(`${sub1} ${sub2}`);
              } else {
                setCardNumber(sub1);
              }
            }}
            label="Card number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {cardType && <img src={cardImage} height="30" alt="issuer" />}
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div>
          <TextField
            fullWidth
            required
            autoComplete="cc-name"
            value={cardHolderName}
            disabled={processing}
            onChange={(e) => setCardHolderName(e.target.value)}
            inputProps={{ maxLength: 255 }}
            label="Name on card"
          />
        </div>
        {cardType && (
          <div className={classes.flex}>
            <TextField
              fullWidth
              required
              inputMode="numeric"
              autoComplete="cc-exp"
              value={cardExpiration}
              disabled={processing}
              onChange={(e) => {
                const expiration = e.target.value.replaceAll("/", "").replaceAll(/[^0-9]+/g, "");
                const sub1 = `${expiration.substring(0, 1)}${expiration.substring(1, 2)}`;
                const sub2 = `${expiration.substring(2, 3)}${expiration.substring(3, 4)}`;
                if (sub2) {
                  setCardExpiration(`${sub1} / ${sub2}`);
                } else {
                  setCardExpiration(sub1);
                }
              }}
              label="Expiration date (MM / YY)"
            />
            <TextField
              fullWidth
              required
              inputMode="numeric"
              autoComplete="cc-csc"
              value={cardSecurityCode}
              disabled={processing}
              onChange={(e) => {
                const code = e.target.value.replaceAll(/[^0-9]+/g, "");
                setCardSecurityCode(code);
              }}
              inputProps={{ maxLength: cardType === "amex" ? 4 : 3 }}
              label={`Security code (${cardType === "amex" ? 4 : 3} digits)`}
            />
          </div>
        )}
        <div className={classes.flex}>
          <div className={classes.flexGrow} />
          <ButtonGroup disabled={processing}>
            <Button color="secondary" size="large" variant="contained">
              Cancel
            </Button>
            <Button color="primary" type="submit" size="large" variant="contained">
              Save payment information
            </Button>
          </ButtonGroup>
        </div>
      </form>
    </div>
  );
};
