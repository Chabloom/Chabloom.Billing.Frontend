import React from "react";

import {
    Button,
    ButtonGroup,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormGroup,
    Grid,
    Paper,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";

import {AccountsApi, BillsApi, BillSchedulesApi} from "../../api/apis";
import {AccountViewModel, BillViewModel, BillScheduleViewModel} from "../../api/models";
import {makeStyles} from "@material-ui/core/styles";
import {Configuration, ConfigurationParameters} from "../../api";
import {AuthConsumer} from "../auth/AuthService";

interface Props {
    accountId: string,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        paper: {
            padding: theme.spacing(2),
            //textAlign: 'center',
            //color: theme.palette.text.secondary,
        },
        button: {
            marginTop: theme.spacing(1),
        }
    }),
);

const Account: React.FC<Props> = (props) => {
    const [account, setAccount] = React.useState<AccountViewModel>();
    const [billSchedule, setBillSchedule] = React.useState<BillScheduleViewModel>();
    const [bill, setBill] = React.useState<BillViewModel>();
    const [open, setOpen] = React.useState<boolean>(false);

    const classes = useStyles();

    // Attempt to load account until successful
    if (account === undefined) {
        // Get an instance of accounts API
        const accountsApi = new AccountsApi(new Configuration({apiKey: ""}));
        // Get the customer account information
        accountsApi.apiAccountsIdGet({id: props.accountId})
            .then(value => setAccount(value));
    }

    let accountInfo = null;
    if (account !== undefined) {
        accountInfo = (
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <Typography variant="h4">Account</Typography>
                    <form>
                        <FormGroup>
                            <TextField required fullWidth label="Name" defaultValue={account.name}/>
                            <TextField required fullWidth label="Primary Address"
                                       defaultValue={account.primaryAddress}/>
                        </FormGroup>
                        <ButtonGroup className={classes.button}>
                            <Button variant="contained" color="primary">
                                Save Changes
                            </Button>
                            <Button variant="contained">
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </form>
                </Paper>
            </Grid>
        );
    }

    let paymentInfo = null;
    if (billSchedule !== undefined) {
        paymentInfo = (
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <Typography variant="h4">{billSchedule.name}</Typography>
                    <FormGroup>
                        <TextField disabled fullWidth label="Amount" defaultValue={billSchedule.amount}/>
                        <TextField disabled fullWidth label="Day Due" defaultValue={billSchedule.dayDue}/>
                        <TextField disabled fullWidth label="Interval" defaultValue={billSchedule.monthInterval}/>
                    </FormGroup>
                </Paper>
            </Grid>
        );
    }

    let billInfo = null;
    if (bill !== undefined) {
        billInfo = (
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <Typography variant="h4">Bill due {bill.dueDate}</Typography>
                    <FormGroup>
                        <TextField disabled fullWidth label="Amount" defaultValue={bill.amount}/>
                        <TextField disabled fullWidth label="Day Due" defaultValue={bill.dueDate}/>
                    </FormGroup>
                    <ButtonGroup className={classes.button}>
                        <Button variant="contained" color="primary" onClick={() => {
                            setOpen(true);
                        }}>
                            Pay Bill
                        </Button>
                    </ButtonGroup>
                </Paper>
            </Grid>
        );
    }

    let transactionInfo = (
        <Dialog
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Pay your bill online"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Input your payment information below to pay your bill online
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setOpen(false);
                }} color="primary">
                    Cancel
                </Button>
                <Button onClick={async () => {}} color="primary" autoFocus>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );

    return (
            <Grid container spacing={3}>
                {accountInfo}
                {paymentInfo}
                {billInfo}
                {transactionInfo}
            </Grid>
    );
};

export default Account;
