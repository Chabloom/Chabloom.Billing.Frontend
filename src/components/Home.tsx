import React from "react";

import {UserManager} from "oidc-client";

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
import {Alert, AlertTitle, Autocomplete} from "@material-ui/lab";

import {TenantsApi} from "../api";
import {TenantViewModel} from "../models";

interface Props {
    userManager: UserManager,
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

const getToken = async (userManager: UserManager) => {
    let token = "";
    const user = await userManager.getUser();
    if (user && !user.expired) {
        token = user.access_token;
    } else {
        localStorage.setItem("redirectUri", window.location.pathname);
        userManager.signinRedirect({}).then().catch(() => {
        });
    }
    return token;
}

export const Home: React.FC<Props> = props => {
    const [tenant, setTenant] = React.useState("");
    const [account, setAccount] = React.useState("");
    const [allTenants, setAllTenants] = React.useState([] as Array<TenantViewModel>);
    const [loaded, setLoaded] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);
    const [error, setError] = React.useState("");

    const classes = useStyles();

    const api = new TenantsApi();
    if (!processing && !loaded) {
        setProcessing(true);
        getToken(props.userManager).then(token => {
            api.readItems(token).then(result => {
                if (typeof result === "string") {
                    setError(result);
                } else {
                    try {
                        setAllTenants(result.sort((a, b) =>
                            a.name.localeCompare(b.name)));
                        setLoaded(true);
                        setProcessing(false);
                    } catch {
                        setError('item read failed');
                    }
                }
            }).catch(reason => setError(reason));
        })
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6">Quick Pay</Typography>
                    <form>
                        <FormGroup>
                            <Autocomplete
                                freeSolo
                                disableClearable
                                options={allTenants.map(t => t.name)}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        required
                                        name="tenant" label="Tenant" value={tenant} disabled={processing}
                                        onChange={e => setTenant(e.target.value)}/>
                                )}
                            />
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
