import React from "react";
import { NavLink } from "react-router-dom";

import { User } from "oidc-client";

import {
  ButtonGroup,
  Checkbox,
  createStyles,
  IconButton,
  lighten,
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
import { Payment, Receipt, Schedule } from "@material-ui/icons";

import { PaymentViewModel } from "../../../types";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  user: User | undefined;
  payments: Array<PaymentViewModel>;
}

interface TableProps {
  payments: Array<PaymentViewModel>;
  selectedIndex: number;
  setSelectedIndex: CallableFunction;
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

const PaymentsActionButtons: React.FC<TableProps> = (props) => {
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

const PaymentsHeading: React.FC<TableProps> = (props) => {
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
            Account Payments
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
        <PaymentsActionButtons {...props} />
      </Toolbar>
    </div>
  );
};

const PaymentsHead: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell>Name</TableCell>
        <TableCell>Amount</TableCell>
        <TableCell>Due Date</TableCell>
        <TableCell>Paid</TableCell>
      </TableRow>
    </TableHead>
  );
};

const PaymentsBody: React.FC<TableProps> = (props) => {
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
            <TableCell>{payment.complete ? "Yes" : "No"}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

const PaymentsTable: React.FC<TableProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.mt1}>
      <PaymentsHeading {...props} />
      <Table>
        <PaymentsHead />
        <PaymentsBody {...props} />
      </Table>
    </div>
  );
};

export const Payments: React.FC<Props> = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  return (
    <PaymentsTable
      {...props}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
    />
  );
};
