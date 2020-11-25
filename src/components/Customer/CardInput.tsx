import * as React from "react";

import { Button, FormGroup, TextField } from "@material-ui/core";

import {
  PaymentCardsApi,
  PaymentCardViewModel,
  UserService,
  useStyles,
} from "../../types";

interface Props {
  userService: UserService;
  buttonText: string;
  completeCardInput: CallableFunction;
}

export const CardInput: React.FC<Props> = (props) => {
  // Initialize classes
  const classes = useStyles();

  const [cardName, setCardName] = React.useState<string>("");
  const [cardNumber, setCardNumber] = React.useState<string>();
  const [cardholderName, setCardholderName] = React.useState<string>();
  const [expirationMonth, setExpirationMonth] = React.useState<string>();
  const [expirationYear, setExpirationYear] = React.useState<string>();
  const [securityCode, setSecurityCode] = React.useState<string>();

  const createPaymentCard = async (card: PaymentCardViewModel) => {
    const api = new PaymentCardsApi(props.userService);
    const [ret, err] = await api.addItem(card);
    if (ret && !err) {
      return ret as PaymentCardViewModel;
    }
    return undefined;
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const card = {
          id: "demo",
          name: cardName,
          cardNumber: cardNumber,
          cardholderName: cardholderName,
          expirationMonth: expirationMonth,
          expirationYear: expirationYear,
        } as PaymentCardViewModel;
        props.completeCardInput(card);
        /*createPaymentCard(card).then((ret) => {
          if (ret) {
            props.completeCardInput(ret);
          }
        });*/
      }}
    >
      <FormGroup>
        <TextField
          className={classes.mt1}
          fullWidth
          required
          name="cardName"
          label="Card Nickname (optional)"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
        <TextField
          className={classes.mt1}
          fullWidth
          required
          name="cardNumber"
          label="Card number"
          value={cardNumber}
          inputMode="numeric"
          autoComplete="cc-number"
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <TextField
          className={classes.mt1}
          fullWidth
          required
          name="cardholderName"
          label="Name on card"
          value={cardholderName}
          autoComplete="cc-name"
          onChange={(e) => setCardholderName(e.target.value)}
        />
        <TextField
          className={classes.mt1}
          required
          name="expirationMonth"
          label="Expiration month (xx)"
          value={expirationMonth}
          inputMode="numeric"
          autoComplete="cc-exp-month"
          onChange={(e) => setExpirationMonth(e.target.value)}
        />
        <TextField
          className={classes.mt1}
          required
          name="expirationYear"
          label="Expiration year (xxxx)"
          value={expirationYear}
          inputMode="numeric"
          autoComplete="cc-exp-year"
          onChange={(e) => setExpirationYear(e.target.value)}
        />
        <TextField
          className={classes.mt1}
          required
          name="securityCode"
          label="Security code"
          value={securityCode}
          inputMode="numeric"
          autoComplete="cc-csc"
          onChange={(e) => setSecurityCode(e.target.value)}
        />
      </FormGroup>
      <Button
        className={classes.mt1}
        variant="contained"
        color="primary"
        type="submit"
      >
        {props.buttonText}
      </Button>
    </form>
  );
};
