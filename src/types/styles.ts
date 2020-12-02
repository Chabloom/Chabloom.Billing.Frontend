import { makeStyles } from "@material-ui/core/styles";
import { createStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
    mt1: {
      marginTop: theme.spacing(1),
    },
    mt2: {
      marginTop: theme.spacing(2),
    },
    mt3: {
      marginTop: theme.spacing(3),
    },
    backdrop: {
      zIndex: theme.zIndex.tooltip + 1,
      color: "#fff",
    },
  })
);
