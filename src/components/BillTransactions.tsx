import React from "react";

import {UserManager} from "oidc-client";

import {BillTransactionsApi} from "../api";

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
    return <ChabloomTable columns={columns} api={new BillTransactionsApi()} userManager={props.userManager}/>;
}
