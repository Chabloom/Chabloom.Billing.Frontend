import React from "react";

import {UserManager} from "oidc-client";

import {ApplicationConfig} from "../settings";

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
    const baseUrl = `${ApplicationConfig.apiPublicAddress}/api/tenants`;
    return <ChabloomTable columns={columns} baseUrl={baseUrl} userManager={props.userManager}/>;
}
