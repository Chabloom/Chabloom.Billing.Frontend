import React from "react";

import { TableCell, TableHead, TableRow } from "@material-ui/core";

export const PaymentTableHead: React.FC = () => {
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
