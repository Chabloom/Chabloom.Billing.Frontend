import * as React from "react";

import { createStyles, Table, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { PaymentViewModel, UserService } from "../../../types";

import { PaymentTableHead } from "./PaymentTableHead";
import { PaymentTableHeading } from "./PaymentTableHeading";
import { PaymentTableBody } from "./PaymentTableBody";

interface Props {
  userService: UserService;
  title: string;
  payments: Array<PaymentViewModel>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
    mt1: {
      marginTop: theme.spacing(1),
    },
  })
);

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
