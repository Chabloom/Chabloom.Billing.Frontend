import React from "react";

import { Checkbox, TableBody, TableCell, TableRow } from "@material-ui/core";

import { PaymentViewModel } from "../../../types";

interface Props {
  payments: Array<PaymentViewModel>;
  selectedIndex: number;
  setSelectedIndex: CallableFunction;
}

export const PaymentTableBody: React.FC<Props> = (props) => {
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
