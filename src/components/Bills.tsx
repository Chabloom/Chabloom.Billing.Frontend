import React from "react";

import {UserManager} from "oidc-client";

import {BillsApi} from "../api";

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
    return <ChabloomTable columns={columns} api={new BillsApi()} userManager={props.userManager}/>;
}
