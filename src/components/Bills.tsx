import React from "react";

import {UserManager} from "oidc-client";

import {BillsApi} from "../api";
import {TenantViewModel} from "../models";

import {ChabloomTable, ChabloomTableColumn} from "./ChabloomTable";

interface Props {
    tenant: TenantViewModel | undefined;
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
    return <ChabloomTable title="Bills" columns={columns} api={new BillsApi()} userManager={props.userManager} tenant={props.tenant}/>;
}
