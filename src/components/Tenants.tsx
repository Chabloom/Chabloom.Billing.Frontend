import React from "react";

import {Column} from "react-table";

import {CircularProgress, Paper, TableContainer} from "@material-ui/core";

import {UserManager} from "oidc-client";

import {TenantsApi} from "../api/apis";
import {TenantViewModel} from "../api/models";
import {Configuration} from "../api/runtime";

import ChabloomTable from "./common/ChabloomTable";

interface Props {
    userManager: UserManager,
}

const columns: Array<Column<TenantViewModel>> = [
    {
        Header: 'Name',
        accessor: "name",
    },
]

const Tenants: React.FC<Props> = (props) => {
    const [data, setData] = React.useState<TenantViewModel[]>([
        {
            id: "1",
            name: "test1",
        },
        {
            id: "2",
            name: "test2",
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
                    const api = new TenantsApi(new Configuration({headers: headers}));
                    // Get all items
                    api.apiTenantsGet()
                        .then(data => setData(data));
                } else {
                    localStorage.setItem("redirectUri", window.location.pathname);
                    props.userManager.signinRedirect({});
                }
            });
        return <CircularProgress/>
    }
};

export default Tenants;
