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
        title: 'Id',
        accessor: "externalId",
    },
    {
        title: 'Amount',
        accessor: "amount",
    },
]

export const BillTransactions: React.FC<Props> = (props) => {
    const baseUrl = `${ApplicationConfig.apiPublicAddress}/api/billTransactions`;
    return <ChabloomTable columns={columns} baseUrl={baseUrl} userManager={props.userManager}/>;
}
