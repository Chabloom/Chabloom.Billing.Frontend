import React from "react";

import {Column} from "react-table";

import {CircularProgress, Paper, TableContainer} from "@material-ui/core";

import {UserManager} from "oidc-client";

import {AccountsApi} from "../api/apis";
import {AccountViewModel} from "../api/models";
import {Configuration} from "../api/runtime";

import ChabloomTable from "./common/ChabloomTable";

interface Props {
    userManager: UserManager,
}

const columns: Array<Column<AccountViewModel>> = [
    {
        Header: 'Name',
        accessor: "name",
    },
    {
        Header: 'Number',
        accessor: "externalId",
    },
    {
        Header: 'Primary Address',
        accessor: "primaryAddress",
    },
]

const Accounts: React.FC<Props> = (props) => {
    const [data, setData] = React.useState<AccountViewModel[]>([
        {
            id: "1",
            name: "test1",
            externalId: "12345",
            primaryAddress: "1 Test Rd.",
            tenant: "1"
        },
        {
            id: "2",
            name: "test2",
            externalId: "12345",
            primaryAddress: "1 Test Rd.",
            tenant: "1"
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
                    const api = new AccountsApi(new Configuration({headers: headers}));
                    // Get all items
                    api.apiAccountsGet()
                        .then(data => setData(data));
                } else {
                    localStorage.setItem("redirectUri", window.location.pathname);
                    props.userManager.signinRedirect({});
                }
            });
        return <CircularProgress/>
    }
};

export default Accounts;
