import React from "react";

import {User, UserManager} from "oidc-client";

import {TenantsApi} from "../api";

import {ChabloomTable, ChabloomTableColumn} from "./ChabloomTable";

interface Props {
    user: User | undefined;
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
    const title = "Tenants";

    return <ChabloomTable
        api={api}
        title={title}
        columns={columns}
        methods={["add", "edit"]}
        userManager={props.userManager}
        tenant={undefined}/>;
}
