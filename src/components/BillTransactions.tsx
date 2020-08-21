import React from "react";

import {Column} from "react-table";

import {CircularProgress, Paper, TableContainer} from "@material-ui/core";

import {UserManager} from "oidc-client";

import {BillTransactionsApi} from "../api/apis";
import {BillTransactionViewModel} from "../api/models";
import {Configuration} from "../api/runtime";

import ChabloomTable from "./common/ChabloomTable";

interface Props {
    userManager: UserManager,
}

const columns: Array<Column<BillTransactionViewModel>> = [
    {
        Header: 'Name',
        accessor: "name",
    },
    {
        Header: 'Id',
        accessor: "externalId",
    },
    {
        Header: 'Amount',
        accessor: "amount",
    },
]

const BillTransactions: React.FC<Props> = (props) => {
    const [data, setData] = React.useState<BillTransactionViewModel[]>([
        {
            id: "1",
            name: "test1",
            externalId: "id1",
            amount: 35.00,
            bill: "1"
        },
        {
            id: "2",
            name: "test2",
            externalId: "id2",
            amount: 35.00,
            bill: "2"
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
                    const api = new BillTransactionsApi(new Configuration({headers: headers}));
                    // Get all items
                    api.apiBillTransactionsGet()
                        .then(data => setData(data));
                } else {
                    localStorage.setItem("redirectUri", window.location.pathname);
                    props.userManager.signinRedirect({});
                }
            });
        return <CircularProgress/>
    }
};

export default BillTransactions;
