import React from "react";

import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

import {AccountsApi} from "../api/apis";
import {AccountViewModel} from "../api/models";

const Accounts: React.FC = () => {
    const [accounts, setAccounts] = React.useState<AccountViewModel[]>();

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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {accounts?.map((account) => (
                        <TableRow key={account.id}>
                            <TableCell>{account.name}</TableCell>
                            <TableCell>{account.primaryAddress}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Accounts;
