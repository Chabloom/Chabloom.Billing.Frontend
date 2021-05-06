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

import { PaymentCardsApi, PaymentCardViewModel } from "../../checkout";
import { Status } from "../../common";
import { BillViewModel, QuickPaymentApi, QuickPaymentViewModel, PaymentsApi, PaymentViewModel } from "../../api";
import { AppConfiguration } from "../../config";

import { SavedPaymentInfo } from "./SavedPaymentInfo";
import { useAppContext } from "../../AppContext";

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
  const [error, setError] = React.useState("");
  const [processing, setProcessing] = React.useState(false);
  const [paymentCardId, setPaymentCardId] = React.useState("");
  const [savedPayments, setSavedPayments] = React.useState<Array<PaymentCardViewModel>>([]);
  const [agreed, setAgreed] = React.useState(false);

  const { userToken } = useAppContext();

  React.useEffect(() => {
    setProcessing(true);
    setError("");
    const api = new PaymentCardsApi(AppConfiguration);
    api
      .readItems(userToken)
      .then(([ret, err]) => {
        if (ret) {
          if (ret.length === 0) {
            setPaymentCardId("new");
          } else {
            setSavedPayments(ret);
          }
        } else {
          setError(err);
        }
      })
      .finally(() => setProcessing(false));
  }, [userToken]);

  const makeTransaction = async (paymentCardId: string) => {
    setProcessing(true);
    setError("");
    const item = {
      name: props.bill.name,
      amount: props.bill.amount,
      paymentCardId: paymentCardId,
    } as PaymentViewModel;
    const api = new PaymentsApi();
    const [ret, err] = await api.addItem(userToken, item);
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
      billId: props.bill.id,
      transactionId: transactionId,
    } as QuickPaymentViewModel;
    const api = new QuickPaymentApi();
    await api.addItem(userToken, item);
    setProcessing(false);
  };
  const completeTransaction = async () => {
    if (paymentCardId) {
      const transactionId = await makeTransaction(paymentCardId);
      if (transactionId) {
        await makeQuickTransaction(transactionId);
        props.setSelectedBill(undefined);
      }
    }
  };

  const getSavedPaymentCardLast4 = (): string => {
    const savedPaymentCard = savedPayments.find((x) => x.id === paymentCardId);
    if (savedPaymentCard && savedPaymentCard.cardNumberLast4) {
      return savedPaymentCard.cardNumberLast4;
    }
    return "0000";
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
                {paymentCardId === "" && (
                  <SavedPaymentInfo
                    {...props}
                    setPaymentCardId={setPaymentCardId}
                    savedPayments={savedPayments}
                    processing={processing}
                  />
                )}
                {paymentCardId !== "" && paymentCardId !== "new" && (
                  <Typography variant="body1">{`Using payment method ending in ${getSavedPaymentCardLast4()}`}</Typography>
                )}
                {paymentCardId !== "" && paymentCardId !== "new" && (
                  <FormControlLabel
                    className={classes.mt1}
                    control={<Checkbox checked={agreed} onChange={() => setAgreed(!agreed)} />}
                    label="I agree to the terms and conditions"
                  />
                )}
              </CardContent>
              {paymentCardId !== "" && paymentCardId !== "new" && (
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
