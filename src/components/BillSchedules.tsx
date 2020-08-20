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

import {BillSchedulesApi} from "../api/apis";
import {BillScheduleViewModel} from "../api/models";

import {Configuration} from "../api/runtime";

interface Props {
    userManager: UserManager,
}

const BillSchedules: React.FC<Props> = (props) => {
    const [billSchedules, setBillSchedules] = React.useState<BillScheduleViewModel[]>();
    const [dialogBillSchedule, setDialogBillSchedule] = React.useState<BillScheduleViewModel>();
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

    if (!billSchedules) {
        props.userManager.getUser()
            .then(value => {
                if (value) {
                    // Get an instance of billSchedules API
                    const headers = {
                        'Authorization': `Bearer ${value?.access_token}`
                    }
                    const billSchedulesApi = new BillSchedulesApi(new Configuration({headers: headers}));
                    // Get all billSchedules
                    console.log('loading billSchedules')
                    billSchedulesApi.apiBillSchedulesGet()
                        .then(value => setBillSchedules(value));
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
                            <TableCell>Day Due</TableCell>
                            <TableCell>Interval</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {billSchedules?.map((billSchedule) => (
                            <TableRow key={billSchedule.id}>
                                <TableCell>{billSchedule.name}</TableCell>
                                <TableCell>{billSchedule.amount}</TableCell>
                                <TableCell>{billSchedule.dayDue}</TableCell>
                                <TableCell>{billSchedule.interval}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="primary" onClick={() => {
                                        setDialogBillSchedule(billSchedule);
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

export default BillSchedules;
