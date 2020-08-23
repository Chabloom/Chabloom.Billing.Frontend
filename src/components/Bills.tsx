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
    {
        title: 'Amount',
        accessor: "amount",
    },
    {
        title: 'Due Date',
        accessor: "dueDate",
    },
]

export const Bills: React.FC<Props> = (props) => {
    const baseUrl = `${ApplicationConfig.apiPublicAddress}/api/bills`;
    return <ChabloomTable columns={columns} baseUrl={baseUrl} userManager={props.userManager}/>;
}
