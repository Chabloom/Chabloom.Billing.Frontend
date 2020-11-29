import * as React from "react";

import {
  Checkbox,
  createStyles,
  TableBody,
  TableCell,
  TableRow,
  Theme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { PaymentViewModel } from "../../../types";

interface Props {
  payments: Array<PaymentViewModel>;
  selectedIndex: number;
  setSelectedIndex: CallableFunction;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paid: {
      backgroundColor:
        theme.palette.type === "dark"
          ? theme.palette.success.dark
          : theme.palette.success.light,
    },
  })
);

export const PaymentTableBody: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <TableBody>
      {props.payments.map((payment, index) => {
        if (new Date(payment.dueDate) < new Date()) {
          return null;
        }
        return (
          <TableRow
            hover={!payment.complete}
            key={payment.id}
            onClick={() => {
              if (props.selectedIndex === index) {
                props.setSelectedIndex(-1);
              } else {
                props.setSelectedIndex(index);
              }
            }}
            className={payment.complete ? classes.paid : ""}
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
