import * as React from "react";

import {
  createStyles,
  lighten,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { PaymentViewModel } from "../../../types";

import { PaymentTableActionButtons } from "./PaymentTableActionButtons";

interface Props {
  title: string;
  payments: Array<PaymentViewModel>;
  selectedIndex: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

export const PaymentTableHeading: React.FC<Props> = (props) => {
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
            {props.title}
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
        <PaymentTableActionButtons {...props} />
      </Toolbar>
    </div>
  );
};
