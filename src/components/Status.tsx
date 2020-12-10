import * as React from "react";

import { createStyles, LinearProgress, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

interface Props {
  processing: boolean;
  error: string;
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

export const Status: React.FC<Props> = (props) => {
  // Initialize classes
  const classes = useStyles();

  return (
    <div>
      {props.error && (
        <Alert className={classes.mt1} severity="error">
          <AlertTitle>Error</AlertTitle>
          {props.error}
        </Alert>
      )}
      {props.processing && <LinearProgress className={classes.mt1} />}
    </div>
  );
};
