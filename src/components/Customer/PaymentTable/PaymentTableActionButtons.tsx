import React from "react";
import { NavLink } from "react-router-dom";

import { ButtonGroup, IconButton, Tooltip } from "@material-ui/core";
import { Payment, Receipt, Schedule } from "@material-ui/icons";

import { PaymentViewModel } from "../../../types";

interface Props {
  payments: Array<PaymentViewModel>;
  selectedIndex: number;
}

const guidEmpty = "00000000-0000-0000-0000-000000000000";

export const PaymentTableActionButtons: React.FC<Props> = (props) => {
  if (props.selectedIndex === -1) {
    return null;
  }
  const payment = props.payments[props.selectedIndex];
  const transaction = props.payments[props.selectedIndex].transaction;
  const hasTransaction = transaction !== guidEmpty;
  return (
    <ButtonGroup>
      {!hasTransaction && (
        <Tooltip title="Set up payment">
          <IconButton
            component={NavLink}
            to={`/transaction?paymentId=${payment.id}`}
          >
            <Payment />
          </IconButton>
        </Tooltip>
      )}
      {hasTransaction && (
        <Tooltip title="Manage payment transaction">
          <IconButton component={NavLink} to={`/transaction/${transaction}`}>
            <Receipt />
          </IconButton>
        </Tooltip>
      )}
    </ButtonGroup>
  );
};
