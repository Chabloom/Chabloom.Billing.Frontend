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

import { BillsAPI, BillViewModel, UserAccountsAPI, UserAccountViewModel } from "../../api";

import { MakePayment } from "./MakePayment";
import { useAppContext } from "../../AppContext";
import {Status} from "../Status";

interface Props {
  userAccount: UserAccountViewModel;
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

export const BillOverview: React.FC<Props> = ({ userAccount, allowTracking }) => {
  const classes = useStyles();

  const [selectedBill, setSelectedBill] = React.useState<BillViewModel>();
  const [accountBills, setAccountBills] = React.useState([] as Array<BillViewModel>);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState("");

  const { userId, userToken, tenant, userAccounts, setUserAccounts } = useAppContext();


  // Get all account bills
  React.useEffect(() => {
    const getAccountBills = async () => {
      setProcessing(true);
      const api = new BillsAPI(userAccount.accountId);
      const success = await api.readAll(userToken);
      if (success) {
        const ret = api.data() as Array<BillViewModel>;
        const futureBills = ret
          .filter((x) => new Date(x.dueDate) > new Date())
          .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        setAccountBills(futureBills);
      } else {
        setError(api.lastError());
      }
      setProcessing(false);
    };
    if (!selectedBill) {
      getAccountBills().then();
    }
  }, [userAccount, userToken, selectedBill]);

  const billComplete = (bill: BillViewModel) => bill.transactionId && bill.transactionId !== guidEmpty;

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item style={{ flexGrow: 1, margin: "auto" }}>
              <Typography variant="h5">{account.name}</Typography>
            </Grid>
            {userToken && allowTracking && (
              <Grid item>
                <Tooltip title="Track account">
                  <IconButton
                    onClick={() => {
                      if (userToken && tenant && userAccounts) {
                        setProcessing(true);
                        const viewModel = {
                          userId: userId,
                          accountId: account.id,
                        } as UserAccountViewModel;
                        const api = new UserAccountsAPI();
                        api
                          .create(viewModel, userToken)
                          .then(() => {
                            setUserAccounts([...userAccounts, viewModel]);
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
            {userToken && !allowTracking && (
              <Grid item>
                <Tooltip title="Don't track account">
                  <IconButton
                    onClick={() => {
                      if (userToken && tenant && userAccounts) {
                        setProcessing(true);
                        const userAccount = userAccounts
                          .filter((x) => x.accountId === account.id)
                          .find((x) => x.userId === userId);
                        if (userAccount) {
                          const api = new UserAccountsAPI();
                          api
                            .delete(userAccount, userToken)
                            .then(() => {
                              setUserAccounts([
                                ...userAccounts.slice(0, userAccounts.indexOf(userAccount)),
                                ...userAccounts.slice(userAccounts.indexOf(userAccount) + 1),
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
        {accountBills.length === 0 && (
          <Grid item xs={12}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">No upcoming bills found</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        {accountBills.length !== 0 &&
          accountBills.map((bill) => {
            const billAmount = `$${bill.amount.toFixed(2)}`;
            const billDueDate = new Date(bill.dueDate);
            let dueDate;
            let billAction;
            if (billComplete(bill)) {
              dueDate = "Paid";
              billAction = "";
            } else {
              dueDate = `Due ${billDueDate.toLocaleDateString()}`;
              billAction = "Make bill";
            }
            return (
              <Grid item xl={2} lg={3} md={4} sm={6} xs={12} key={`account-bill-${bill.id}`}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6">{bill.name}</Typography>
                    <Typography variant="body1">{dueDate}</Typography>
                    <Typography variant="body1">{billAmount}</Typography>
                  </CardContent>
                  <CardActions>
                    <Tooltip title={billAction}>
                      <IconButton
                        onClick={() => {
                          if (!billComplete(bill)) {
                            setSelectedBill(selectedBill === undefined ? bill : undefined);
                          }
                        }}
                      >
                        {billComplete(bill) && <CheckCircle />}
                        {!billComplete(bill) && <Payment />}
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
                {selectedBill === bill && !billComplete(bill) && (
                  <MakePayment bill={bill} selectedBill={selectedBill} setSelectedBill={setSelectedBill} />
                )}
              </Grid>
            );
          })}
      </Grid>
      <Status processing={processing} error={error} />
    </Paper>
  );
};
