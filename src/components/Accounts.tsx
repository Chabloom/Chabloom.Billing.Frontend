import React from "react";

import {
    Button,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";

import {UserManager} from "oidc-client";

import {AccountsApi} from "../api/apis";
import {AccountViewModel} from "../api/models";

import AccountDetails from "./AccountDetails";
import {Configuration} from "../api/runtime";

interface Props {
    userManager: UserManager,
}

const Accounts: React.FC<Props> = (props) => {
    const [accounts, setAccounts] = React.useState<AccountViewModel[]>();
    const [dialogAccount, setDialogAccount] = React.useState<AccountViewModel>();
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

    if (!accounts) {
        props.userManager.getUser()
            .then(value => {
                if (value) {
                    // Get an instance of accounts API
                    const headers = {
                        'Authorization': `Bearer ${value?.access_token}`
                    }
                    const accountsApi = new AccountsApi(new Configuration({headers: headers}));
                    // Get all accounts
                    console.log('loading accounts')
                    accountsApi.apiAccountsGet()
                        .then(value => setAccounts(value));
                } else {
                    localStorage.setItem("redirectUri", window.location.pathname);
                    props.userManager.signinRedirect({});
                }
            });
        return <CircularProgress/>
    } else {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Number</TableCell>
                            <TableCell>Primary Address</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts?.map((account) => (
                            <TableRow key={account.id}>
                                <TableCell>{account.name}</TableCell>
                                <TableCell>{account.externalId}</TableCell>
                                <TableCell>{account.primaryAddress}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="primary" onClick={() => {
                                        setDialogAccount(account);
                                        setDialogOpen(true);
                                    }}>Details</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {dialogAccount !== undefined &&
                <AccountDetails userManager={props.userManager} open={dialogOpen} account={dialogAccount} close={() => setDialogOpen(false)}/>}
            </TableContainer>
        );
    }
};

export default Accounts;
