import React from "react";

import {
    Button,
    createStyles,
    FormGroup,
    Grid,
    LinearProgress,
    Paper,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Alert, AlertTitle} from "@material-ui/lab";

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

export const Home: React.FC = (props) => {
    const [tenant, setTenant] = React.useState("");
    const [account, setAccount] = React.useState("");
    const [error, setError] = React.useState("");
    const [processing, setProcessing] = React.useState(false);

    const classes = useStyles();

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6">Quick Pay</Typography>
                    <form>
                        <FormGroup>
                            <TextField required name="tenant" label="Tenant" value={tenant}
                                       disabled={processing} onChange={e => setTenant(e.target.value)}/>
                            <TextField required name="account" label="Account" value={account}
                                       disabled={processing} onChange={e => setAccount(e.target.value)}/>
                        </FormGroup>
                        {error &&
                        <Alert className={classes.mt1} severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {error}
                        </Alert>
                        }
                        {processing &&
                        <LinearProgress className={classes.mt1}/>
                        }
                        <Button className={classes.mt1} variant="contained" color="primary" type="submit"
                                disabled={processing}>
                            Get Bills
                        </Button>
                    </form>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6">Upcoming Bills</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}
