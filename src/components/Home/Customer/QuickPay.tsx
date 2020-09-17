import React from "react";

import {User} from "oidc-client";

import {makeStyles} from "@material-ui/core/styles";
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
import {Alert, AlertTitle, Autocomplete} from "@material-ui/lab";

import {TenantViewModel} from "../../../models";

interface Props {
    user: User | undefined;
    allTenants: Array<TenantViewModel>;
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

export const QuickPay: React.FC<Props> = (props) => {
    const [tenant, setTenant] = React.useState("");
    const [account, setAccount] = React.useState("");
    const [processing, setProcessing] = React.useState(false);
    const [error, setError] = React.useState("");

    const classes = useStyles();

    return (
        <Grid item md={6} xs={12}>
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6">Quick Pay</Typography>
                <form onSubmit={() => {
                    // TODO: Handle submit
                    setProcessing(true);
                    setError("");
                    setProcessing(false);
                }}>
                    <FormGroup>
                        <Autocomplete
                            freeSolo
                            disableClearable
                            options={props.allTenants.map(t => t.name)}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    required
                                    name="tenant" label="Tenant" value={tenant} disabled={processing}
                                    onChange={e => setTenant(e.target.value)}/>
                            )}
                        />
                        <TextField required name="account" label="Account Number" value={account}
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
    );
}
