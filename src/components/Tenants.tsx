import React from "react";

import {UserManager} from "oidc-client";

import {TenantsApi} from "../api";

import {ChabloomTable, ChabloomTableColumn} from "./ChabloomTable";

interface Props {
    userManager: UserManager;
}

const columns: Array<ChabloomTableColumn> = [
    {
        title: 'Name',
        accessor: "name",
        type: "text",
    },
]

// The API to use
let api: TenantsApi = new TenantsApi();

export const Tenants: React.FC<Props> = (props) => {
    return <ChabloomTable
        api={api}
        title="Tenants"
        columns={columns}
        methods={["add", "edit"]}
        userManager={props.userManager}
        tenant={undefined}/>;
}
