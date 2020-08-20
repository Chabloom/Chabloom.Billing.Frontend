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

import {BillsApi} from "../api/apis";
import {BillViewModel} from "../api/models";

import {Configuration} from "../api/runtime";

interface Props {
    userManager: UserManager,
}

const Bills: React.FC<Props> = (props) => {
    const [bills, setBills] = React.useState<BillViewModel[]>();
    const [dialogBill, setDialogBill] = React.useState<BillViewModel>();
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

    if (!bills) {
        props.userManager.getUser()
            .then(value => {
                if (value) {
                    // Get an instance of bills API
                    const headers = {
                        'Authorization': `Bearer ${value?.access_token}`
                    }
                    const billsApi = new BillsApi(new Configuration({headers: headers}));
                    // Get all bills
                    console.log('loading bills')
                    billsApi.apiBillsGet()
                        .then(value => setBills(value));
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
                            <TableCell>Amount</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bills?.map((bill) => (
                            <TableRow key={bill.id}>
                                <TableCell>{bill.name}</TableCell>
                                <TableCell>{bill.amount}</TableCell>
                                <TableCell>{bill.dueDate}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="primary" onClick={() => {
                                        setDialogBill(bill);
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

export default Bills;
