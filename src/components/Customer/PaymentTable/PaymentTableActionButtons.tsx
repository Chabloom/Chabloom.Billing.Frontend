import * as React from "react";
import { NavLink } from "react-router-dom";

import { ButtonGroup, IconButton, Tooltip } from "@material-ui/core";
import { Payment, Receipt } from "@material-ui/icons";

import { PaymentViewModel, UserService } from "../../../types";

import { MakeTransaction } from "../Transaction";

interface Props {
  userService: UserService;
  payments: Array<PaymentViewModel>;
  selectedIndex: number;
}

const guidEmpty = "00000000-0000-0000-0000-000000000000";

export const PaymentTableActionButtons: React.FC<Props> = (props) => {
  // Initialize state variables
  const [payment, setPayment] = React.useState<PaymentViewModel>();

  if (props.selectedIndex === -1) {
    return null;
  }
  const selectedPayment = props.payments[props.selectedIndex];
  const transaction = props.payments[props.selectedIndex].transaction;
  const hasTransaction = transaction !== guidEmpty;
  return (
    <div>
      <ButtonGroup>
        {!hasTransaction && (
          <Tooltip title="Set up payment">
            <IconButton onClick={() => setPayment(selectedPayment)}>
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
      <MakeTransaction {...props} payment={payment} setPayment={setPayment} />
    </div>
  );
};
