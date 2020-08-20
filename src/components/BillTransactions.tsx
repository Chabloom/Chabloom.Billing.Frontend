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

import {BillTransactionsApi} from "../api/apis";
import {BillTransactionViewModel} from "../api/models";

import {Configuration} from "../api/runtime";

interface Props {
    userManager: UserManager,
}

const BillTransactions: React.FC<Props> = (props) => {
    const [billTransactions, setBillTransactions] = React.useState<BillTransactionViewModel[]>();
    const [dialogBillTransaction, setDialogBillTransaction] = React.useState<BillTransactionViewModel>();
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

    if (!billTransactions) {
        props.userManager.getUser()
            .then(value => {
                if (value) {
                    // Get an instance of billTransactions API
                    const headers = {
                        'Authorization': `Bearer ${value?.access_token}`
                    }
                    const billTransactionsApi = new BillTransactionsApi(new Configuration({headers: headers}));
                    // Get all billTransactions
                    console.log('loading billTransactions')
                    billTransactionsApi.apiBillTransactionsGet()
                        .then(value => setBillTransactions(value));
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
                            <TableCell>Amount</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {billTransactions?.map((billTransaction) => (
                            <TableRow key={billTransaction.id}>
                                <TableCell>{billTransaction.name}</TableCell>
                                <TableCell>{billTransaction.externalId}</TableCell>
                                <TableCell>{billTransaction.amount}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="primary" onClick={() => {
                                        setDialogBillTransaction(billTransaction);
                                        setDialogOpen(true);
                                    }}>Details</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
};

export default BillTransactions;
