import React from "react";
import { NavLink } from "react-router-dom";

import { User } from "oidc-client";

import {
  ButtonGroup,
  Checkbox,
  createStyles,
  Grid,
  IconButton,
  lighten,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Payment, Receipt, Schedule } from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";

import {
  AccountsApi,
  AccountViewModel,
  PaymentsApi,
  PaymentViewModel,
} from "../../../../types";

interface Props {
  user: User | undefined;
}

interface QuickViewProps {
  title: string;
  payments: Array<PaymentViewModel>;
  setPayments: CallableFunction;
  selectedIndex: number;
  setSelectedIndex: CallableFunction;
  processing: boolean;
  error: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
    mt1: {
      marginTop: theme.spacing(1),
    },
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
  })
);

const guidEmpty = "00000000-0000-0000-0000-000000000000";

const QuickViewActionButtons: React.FC<QuickViewProps> = (props) => {
  if (props.selectedIndex === -1) {
    return null;
  }
  const transaction = props.payments[props.selectedIndex].transaction;
  const hasTransaction = transaction !== guidEmpty;
  const transactionSchedule =
    props.payments[props.selectedIndex].transactionSchedule;
  const hasTransactionSchedule = transactionSchedule !== guidEmpty;
  return (
    <ButtonGroup>
      {!hasTransaction && !hasTransactionSchedule && (
        <Tooltip title="Set up payment">
          <IconButton component={NavLink} to="/transactions">
            <Payment />
          </IconButton>
        </Tooltip>
      )}
      {hasTransaction && (
        <Tooltip title="Manage payment transaction">
          <IconButton component={NavLink} to={`/transactions/${transaction}`}>
            <Receipt />
          </IconButton>
        </Tooltip>
      )}
      {hasTransactionSchedule && (
        <Tooltip title="Manage payment auto pay schedule">
          <IconButton
            component={NavLink}
            to={`/transactionSchedules/${transactionSchedule}`}
          >
            <Schedule />
          </IconButton>
        </Tooltip>
      )}
    </ButtonGroup>
  );
};

const QuickViewHeading: React.FC<QuickViewProps> = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Toolbar
        className={
          props.selectedIndex === -1 ? classes.root : classes.highlight
        }
      >
        {props.selectedIndex === -1 ? (
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {props.title}
          </Typography>
        ) : (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            1 selected
          </Typography>
        )}
        <QuickViewActionButtons {...props} />
      </Toolbar>
      {props.processing && <LinearProgress />}
      {props.error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {props.error}
        </Alert>
      )}
    </div>
  );
};

const QuickViewHead: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell>Name</TableCell>
        <TableCell>Amount</TableCell>
        <TableCell>Due Date</TableCell>
      </TableRow>
    </TableHead>
  );
};

const QuickViewBody: React.FC<QuickViewProps> = (props) => {
  return (
    <TableBody>
      {props.payments.map((payment, index) => {
        if (new Date(payment.dueDate) < new Date()) {
          return null;
        }
        return (
          <TableRow
            hover
            key={payment.id}
            onClick={() => {
              if (props.selectedIndex === index) {
                props.setSelectedIndex(-1);
              } else {
                props.setSelectedIndex(index);
              }
            }}
          >
            <TableCell padding="checkbox">
              <Checkbox checked={props.selectedIndex === index} />
            </TableCell>
            <TableCell>{payment.name}</TableCell>
            <TableCell>{`$${payment.amount.toFixed(2)}`}</TableCell>
            <TableCell>
              {new Date(payment.dueDate).toLocaleDateString()}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

const QuickViewTable: React.FC<QuickViewProps> = (props) => {
  return (
    <div>
      <QuickViewHeading {...props} />
      <Table>
        <QuickViewHead />
        <QuickViewBody {...props} />
      </Table>
    </div>
  );
};

export const QuickView: React.FC<Props> = (props) => {
  const [accounts, setAccounts] = React.useState([] as Array<AccountViewModel>);
  const [payments, setPayments] = React.useState([] as Array<PaymentViewModel>);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState("");

  const classes = useStyles();

  React.useEffect(() => {
    if (props.user && !props.user.expired) {
      const api = new AccountsApi();
      setProcessing(true);
      api
        .readItems(props.user.access_token)
        .then((ret) => {
          if (typeof ret !== "string") {
            setAccounts(ret);
            ret.forEach((account) => {
              const api = new PaymentsApi(account.id as string);
              api.readItems(props.user?.access_token).then((ret) => {
                if (typeof ret !== "string") {
                  setPayments((p) => [...p, ...ret]);
                }
              });
            });
          }
        })
        .catch((reason) => setError(reason))
        .finally(() => setProcessing(false));
    }
  }, [props.user]);

  return (
    <Grid item md={6} xs={12}>
      <Grid container spacing={2}>
        {accounts.map((account) => {
          const accountPayments = payments
            .filter((x) => x.account === account.id)
            .filter((x) => new Date(x.dueDate) > new Date());
          if (accountPayments.length !== 0) {
            return (
              <Grid item xs={12}>
                <Paper elevation={3} className={classes.paper}>
                  <QuickViewTable
                    title={account.name}
                    payments={payments}
                    setPayments={setPayments}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    processing={processing}
                    error={error}
                  />
                </Paper>
              </Grid>
            );
          }
          return null;
        })}
      </Grid>
    </Grid>
  );
};
