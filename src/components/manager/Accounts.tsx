import React from "react";

import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

import {AccountsApi} from "../../api/apis";
import {AccountViewModel} from "../../api/models";
import AccountDetails from "./AccountDetails";

const Accounts: React.FC = () => {
    const [accounts, setAccounts] = React.useState<AccountViewModel[]>();
    const [dialogAccount, setDialogAccount] = React.useState<AccountViewModel>();
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

    // Attempt to load accounts until successful
    if (accounts === undefined) {
        // Get an instance of accounts API
        const accountsApi = new AccountsApi();
        // Get all accounts
        accountsApi.apiAccountsGet()
            .subscribe({
                next(value) {
                    setAccounts(value as AccountViewModel[]);
                },
            });
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Account Name</TableCell>
                        <TableCell>Primary Address</TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {accounts?.map((account) => (
                        <TableRow key={account.id}>
                            <TableCell>{account.name}</TableCell>
                            <TableCell>{account.primaryAddress}</TableCell>
                            <TableCell>{account.enabled ? "True" : "False"}</TableCell>
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
            <AccountDetails open={dialogOpen} account={dialogAccount} close={() => setDialogOpen(false)}/>}
        </TableContainer>
    );
};

export default Accounts;
