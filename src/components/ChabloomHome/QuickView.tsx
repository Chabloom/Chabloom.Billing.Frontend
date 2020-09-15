import React from "react";

import {User} from "oidc-client";

import {createStyles, Grid, Paper, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface Props {
    user: User | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
        },
        mt1: {
            marginTop: theme.spacing(1),
        }
    }),
);

export const ChabloomQuickView: React.FC<Props> = (props) => {
    const classes = useStyles();

    return (
        <Grid item xs={6}>
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6">Upcoming Bills</Typography>
            </Paper>
        </Grid>
    );
}
