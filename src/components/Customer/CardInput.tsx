import React from "react";

import {
  Button,
  createStyles,
  FormGroup,
  TextField,
  Theme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { PaymentCardsApi, PaymentCardViewModel } from "../../types";

import { UserService } from "../UserService";

interface Props {
  userService: UserService;
  buttonText: string;
  completeCardInput: CallableFunction;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(5),
    },
    mt1: {
      marginTop: theme.spacing(1),
    },
  })
);

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
    const user = await props.userService.getUser(false);
    const api = new PaymentCardsApi();
    const [ret, err] = await api.addItem(user?.access_token, card);
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
          name: cardName,
          cardNumber: cardNumber,
          cardholderName: cardholderName,
          expirationMonth: expirationMonth,
          expirationYear: expirationYear,
        } as PaymentCardViewModel;
        createPaymentCard(card).then((ret) => {
          if (ret) {
            props.completeCardInput(ret);
          }
        });
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
