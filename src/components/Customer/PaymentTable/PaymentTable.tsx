import * as React from "react";

import { Table } from "@material-ui/core";

import { PaymentViewModel, UserService, useStyles } from "../../../types";

import { PaymentTableHead } from "./PaymentTableHead";
import { PaymentTableHeading } from "./PaymentTableHeading";
import { PaymentTableBody } from "./PaymentTableBody";

interface Props {
  userService: UserService;
  title: string;
  payments: Array<PaymentViewModel>;
}

export const PaymentTable: React.FC<Props> = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const classes = useStyles();

  return (
    <div className={classes.mt1}>
      <PaymentTableHeading {...props} selectedIndex={selectedIndex} />
      <Table>
        <PaymentTableHead />
        <PaymentTableBody
          {...props}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </Table>
    </div>
  );
};
