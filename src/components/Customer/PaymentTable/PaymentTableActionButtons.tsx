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
