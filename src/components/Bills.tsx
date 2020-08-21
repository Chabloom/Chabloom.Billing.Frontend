import React from "react";

import {Column} from "react-table";

import {CircularProgress, Paper, TableContainer} from "@material-ui/core";

import {UserManager} from "oidc-client";

import {BillsApi} from "../api/apis";
import {BillViewModel} from "../api/models";
import {Configuration} from "../api/runtime";

import ChabloomTable from "./common/ChabloomTable";

interface Props {
    userManager: UserManager,
}

const columns: Array<Column<BillViewModel>> = [
    {
        Header: 'Name',
        accessor: "name",
    },
    {
        Header: 'Amount',
        accessor: "amount",
    },
    {
        Header: 'Due Date',
        accessor: "dueDate",
    },
]

const Bills: React.FC<Props> = (props) => {
    const [data, setData] = React.useState<BillViewModel[]>([
        {
            id: "1",
            name: "test1",
            amount: 35.00,
            dueDate: new Date().toDateString(),
            account: "1",
        },
        {
            id: "2",
            name: "test2",
            amount: 35.00,
            dueDate: new Date().toDateString(),
            account: "2",
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
                    const api = new BillsApi(new Configuration({headers: headers}));
                    // Get all items
                    api.apiBillsGet()
                        .then(data => setData(data));
                } else {
                    localStorage.setItem("redirectUri", window.location.pathname);
                    props.userManager.signinRedirect({});
                }
            });
        return <CircularProgress/>
    }
};

export default Bills;
