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
    },
]

export const Tenants: React.FC<Props> = (props) => {
    return <ChabloomTable columns={columns} api={new TenantsApi()} userManager={props.userManager} tenant={undefined}/>;
}
