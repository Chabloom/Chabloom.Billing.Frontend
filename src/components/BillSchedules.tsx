import React from "react";

import {Column} from "react-table";

import {CircularProgress, Paper, TableContainer} from "@material-ui/core";

import {UserManager} from "oidc-client";

import {BillSchedulesApi} from "../api/apis";
import {BillScheduleViewModel} from "../api/models";
import {Configuration} from "../api/runtime";

import ChabloomTable from "./common/ChabloomTable";

interface Props {
    userManager: UserManager,
}

const columns: Array<Column<BillScheduleViewModel>> = [
    {
        Header: 'Name',
        accessor: "name",
    },
    {
        Header: 'Amount',
        accessor: "amount",
    },
    {
        Header: 'Day Due',
        accessor: "dayDue",
    },
    {
        Header: 'Interval',
        accessor: "interval",
    },
]

const BillSchedules: React.FC<Props> = (props) => {
    const [data, setData] = React.useState<BillScheduleViewModel[]>([
        {
            id: "1",
            name: "test1",
            amount: 35.00,
            dayDue: 3,
            interval: 1,
            enabled: true,
            account: "1"
        },
        {
            id: "2",
            name: "test2",
            amount: 35.00,
            dayDue: 18,
            interval: 1,
            enabled: true,
            account: "2"
        },
    ]);

    if (data) {
        return (
            <TableContainer component={Paper}>
                <ChabloomTable columns={columns} data={data}/>
            </TableContainer>
        );
    } else {
        props.userManager.getUser()
            .then(user => {
                if (user) {
                    // Define headers
                    const headers = {
                        'Authorization': `Bearer ${user?.access_token}`
                    }
                    // Get an API instance
                    const api = new BillSchedulesApi(new Configuration({headers: headers}));
                    // Get all items
                    api.apiBillSchedulesGet()
                        .then(data => setData(data));
                } else {
                    localStorage.setItem("redirectUri", window.location.pathname);
                    props.userManager.signinRedirect({});
                }
            });
        return <CircularProgress/>
    }
};

export default BillSchedules;
