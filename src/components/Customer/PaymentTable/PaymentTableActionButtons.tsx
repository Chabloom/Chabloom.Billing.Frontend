import * as React from "react";

import { IconButton, Tooltip } from "@material-ui/core";
import { Payment, Receipt } from "@material-ui/icons";

import { PaymentViewModel, UserService } from "../../../types";

import { MakeTransaction, ViewTransaction } from "../Transaction";

interface Props {
  userService: UserService;
  payments: Array<PaymentViewModel>;
  selectedIndex: number;
}

export const PaymentTableActionButtons: React.FC<Props> = (props) => {
  // Initialize state variables
  const [payment, setPayment] = React.useState<PaymentViewModel>();
  const [
    currentPayment,
    setCurrentPayment,
  ] = React.useState<PaymentViewModel>();
  const [hasTransaction, setHasTransaction] = React.useState<boolean>(false);

  // Update the selected payment
  React.useEffect(() => {
    if (props.selectedIndex !== -1) {
      setCurrentPayment(props.payments[props.selectedIndex]);
      setHasTransaction(props.payments[props.selectedIndex].complete);
    }
  }, [props.payments, props.selectedIndex]);

  if (props.selectedIndex !== -1) {
    if (hasTransaction) {
      return (
        <div>
          <Tooltip title="Manage payment">
            <IconButton onClick={() => setPayment(currentPayment)}>
              <Receipt />
            </IconButton>
          </Tooltip>
          <ViewTransaction
            {...props}
            payment={payment}
            setPayment={setPayment}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Tooltip title="Set up payment">
            <IconButton onClick={() => setPayment(currentPayment)}>
              <Payment />
            </IconButton>
          </Tooltip>
          <MakeTransaction
            {...props}
            payment={payment}
            setPayment={setPayment}
          />
        </div>
      );
    }
  }
  return null;
};
