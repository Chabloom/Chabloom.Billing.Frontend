import * as React from "react";

import { LinearProgress } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { useStyles } from "../types";

interface Props {
  processing: boolean;
  error: string;
}

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
