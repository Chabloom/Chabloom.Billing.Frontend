import * as React from "react";

import {
  Card,
  CardActions,
  CardContent,
  createStyles,
  Grid,
  IconButton,
  Paper,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AddCircle, CheckCircle, Payment, RemoveCircle } from "@material-ui/icons";

import { AccountUsersApi, AccountUserViewModel, AccountViewModel, BillsApi, BillViewModel } from "../../types";

import { MakeTransaction } from "./MakeTransaction";
import { Status } from "../Status";
import { useAppContext } from "../../AppContext";

interface Props {
  account: AccountViewModel;
  allowTracking: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  })
);

const guidEmpty = "00000000-0000-0000-0000-000000000000";

export const PaymentOverview: React.FC<Props> = (props) => {
  const classes = useStyles();

  const [selectedPayment, setSelectedPayment] = React.useState<BillViewModel>();
  const [accountPayments, setAccountPayments] = React.useState([] as Array<BillViewModel>);
  const [accountUsers, setAccountUsers] = React.useState([] as Array<AccountUserViewModel>);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState("");

  const { userId, userToken, trackedAccounts, setTrackedAccounts } = useAppContext();

  // Get all account payments
  React.useEffect(() => {
    const getAccountPayments = async () => {
      setProcessing(true);
      const api = new BillsApi(props.account.id);
      const [payments, err] = await api.readItems(userToken);
      if (payments) {
        const futurePayments = payments
          .filter((x) => new Date(x.dueDate) > new Date())
          .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        setAccountPayments(futurePayments);
      } else {
        setError(err);
      }
      setProcessing(false);
    };
    getAccountPayments().then();
  }, [props.account, userToken]);

  // Get all account users
  React.useEffect(() => {
    if (userToken) {
      const getAccountUsers = async () => {
        setProcessing(true);
        const api = new AccountUsersApi(props.account.id);
        const [users, err] = await api.readItems(userToken);
        if (users && users.length !== 0 && !err) {
          setAccountUsers(users);
        }
        setProcessing(false);
      };
      getAccountUsers().then();
    }
  }, [props.account, userToken]);

  const billComplete = (bill: BillViewModel) => bill.transactionId && bill.transactionId !== guidEmpty;

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item style={{ flexGrow: 1, margin: "auto" }}>
              <Typography variant="h5">{props.account.name}</Typography>
            </Grid>
            {userToken && props.allowTracking && (
              <Grid item>
                <Tooltip title="Track account">
                  <IconButton
                    onClick={() => {
                      if (userToken) {
                        setProcessing(true);
                        const model = {
                          userId: userId,
                        } as AccountUserViewModel;
                        const api = new AccountUsersApi(props.account.id);
                        api
                          .addItem(userToken, model)
                          .then(() => {
                            setTrackedAccounts([...trackedAccounts, props.account]);
                          })
                          .finally(() => setProcessing(false));
                      }
                    }}
                  >
                    <AddCircle />
                  </IconButton>
                </Tooltip>
              </Grid>
            )}
            {userToken && !props.allowTracking && (
              <Grid item>
                <Tooltip title="Don't track account">
                  <IconButton
                    onClick={() => {
                      if (userToken) {
                        setProcessing(true);
                        const accountUser = accountUsers
                          .filter((x) => x.accountId === props.account.id)
                          .find((x) => x.userId === userId);
                        if (accountUser) {
                          const api = new AccountUsersApi(props.account.id);
                          api
                            .deleteItem(userToken, accountUser)
                            .then(() => {
                              setTrackedAccounts([
                                ...trackedAccounts.slice(0, trackedAccounts.indexOf(props.account)),
                                ...trackedAccounts.slice(trackedAccounts.indexOf(props.account) + 1),
                              ]);
                            })
                            .finally(() => setProcessing(false));
                        }
                      }
                    }}
                  >
                    <RemoveCircle />
                  </IconButton>
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </Grid>
        {accountPayments.length === 0 && (
          <Grid item xs={12}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">No upcoming payments found</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        {accountPayments.length !== 0 &&
          accountPayments.map((payment) => {
            const paymentAmount = `$${payment.amount.toFixed(2)}`;
            const paymentDueDate = new Date(payment.dueDate);
            let dueDate;
            let paymentAction;
            if (billComplete(payment)) {
              dueDate = "Paid";
              paymentAction = "";
            } else {
              dueDate = `Due ${paymentDueDate.toLocaleDateString()}`;
              paymentAction = "Make payment";
            }
            return (
              <Grid item xl={2} lg={3} md={4} sm={6} xs={12} key={`account-payment-${payment.id}`}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6">{payment.name}</Typography>
                    <Typography variant="body1">{dueDate}</Typography>
                    <Typography variant="body1">{paymentAmount}</Typography>
                  </CardContent>
                  <CardActions>
                    <Tooltip title={paymentAction}>
                      <IconButton
                        onClick={() => {
                          if (!billComplete(payment)) {
                            setSelectedPayment(selectedPayment === undefined ? payment : undefined);
                          }
                        }}
                      >
                        {billComplete(payment) && <CheckCircle />}
                        {!billComplete(payment) && <Payment />}
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
                {selectedPayment === payment && !billComplete(payment) && (
                  <MakeTransaction
                    {...props}
                    payment={payment}
                    selectedPayment={selectedPayment}
                    setSelectedPayment={setSelectedPayment}
                  />
                )}
              </Grid>
            );
          })}
      </Grid>
      <Status processing={processing} error={error} />
    </Paper>
  );
};
