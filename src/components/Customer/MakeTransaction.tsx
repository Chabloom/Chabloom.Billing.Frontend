import * as React from "react";

import { User } from "oidc-client";

import {
  Backdrop,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  Hidden,
  Theme,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import {
  BillViewModel,
  PaymentCardsApi,
  PaymentCardViewModel,
  QuickTransactionApi,
  QuickTransactionViewModel,
  TransactionsApi,
  TransactionViewModel,
} from "../../types";

import { Status } from "../Status";
import { SavedPaymentInfo } from "./SavedPaymentInfo";
import { NewPaymentInfo } from "./NewPaymentInfo";
import { CancelOutlined, CheckCircle } from "@material-ui/icons";

interface Props {
  user: User | undefined;
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

  // Initialize state variables
  const [error, setError] = React.useState("");
  const [processing, setProcessing] = React.useState(false);
  const [paymentCardId, setPaymentCardId] = React.useState("");
  const [savedPayments, setSavedPayments] = React.useState<Array<PaymentCardViewModel>>([]);

  React.useEffect(() => {
    var api = new PaymentCardsApi(props.user);
    api.readItems().then(([ret, err]) => {
      if (ret) {
        setSavedPayments(ret);
      } else {
        console.log(err);
      }
    });
  }, [props.user]);

  const makeTransaction = async (paymentCardId: string) => {
    setProcessing(true);
    setError("");
    const item = {
      name: props.payment.name,
      amount: props.payment.amount,
      paymentCardId: paymentCardId,
    } as TransactionViewModel;
    const api = new TransactionsApi(props.user);
    const [ret, err] = await api.addItem(item);
    setProcessing(false);
    if (ret) {
      return ret.id;
    } else {
      setError(err);
    }
    return "";
  };
  const makeQuickTransaction = async (transactionId: string) => {
    setProcessing(true);
    setError("");
    const item = {
      paymentId: props.payment.id,
      transactionId: transactionId,
    } as QuickTransactionViewModel;
    const api = new QuickTransactionApi();
    await api.addItem(item);
    setProcessing(false);
  };
  const completeTransaction = async () => {
    if (paymentCardId) {
      const transactionId = await makeTransaction(paymentCardId);
      if (transactionId) {
        await makeQuickTransaction(transactionId);
        props.setSelectedPayment(undefined);
      }
    }
  };

  const getSavedPaymentCardLast4 = () => {
    const savedPaymentCard = savedPayments.find((x) => x.id === paymentCardId);
    if (savedPaymentCard) {
      return savedPaymentCard.cardNumberLast4;
    }
    return "0000";
  };

  const paymentAmount = `$${props.payment.amount.toFixed(2)}`;
  const paymentDueDate = new Date(props.payment.dueDate);
  const dueDate = `Due ${paymentDueDate.toLocaleDateString()}`;

  return (
    <React.Fragment>
      <Backdrop
        className={classes.backdrop}
        open={props.selectedPayment === props.payment}
        onClick={() => props.setSelectedPayment(undefined)}
      >
        <Grid container className={classes.paper} alignItems="center" justify="center" style={{ minHeight: "100vh" }}>
          <Grid item xs={12} sm={8} md={4}>
            <Card onClick={(e) => e.stopPropagation()}>
              <CardHeader title="Manage payment" />
              <CardContent>
                <Typography variant="h6">{props.payment.name}</Typography>
                <Typography variant="body1">{dueDate}</Typography>
                <Typography variant="body1">{paymentAmount}</Typography>
                {paymentCardId === "" && (
                  <SavedPaymentInfo
                    {...props}
                    paymentCardId={paymentCardId}
                    setPaymentCardId={setPaymentCardId}
                    savedPayments={savedPayments}
                  />
                )}
                {paymentCardId === "new" && (
                  <NewPaymentInfo
                    {...props}
                    paymentCardId={paymentCardId}
                    setPaymentCardId={setPaymentCardId}
                    savedPayments={savedPayments}
                    setSavedPayments={setSavedPayments}
                    setError={setError}
                    setProcessing={setProcessing}
                  />
                )}
                {paymentCardId !== "" && paymentCardId !== "new" && (
                  <Typography variant="body1">{`Using payment method ending in ${getSavedPaymentCardLast4()}`}</Typography>
                )}
              </CardContent>
              {paymentCardId !== "" && paymentCardId !== "new" && (
                <CardActionArea>
                  <CardActions>
                    <ButtonGroup fullWidth>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          completeTransaction().then();
                        }}
                      >
                        <CheckCircle className={classes.mr1} />
                        <Hidden smDown implementation="css">
                          Complete
                        </Hidden>
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setPaymentCardId("");
                        }}
                      >
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
