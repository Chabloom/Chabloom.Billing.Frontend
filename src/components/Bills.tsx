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
        type: "text",
    },
    {
        title: 'Amount',
        accessor: "amount",
        type: "number",
    },
    {
        title: 'Due Date',
        accessor: "dueDate",
        type: "date",
    },
]

export const Bills: React.FC<Props> = props => {
    const params = new URLSearchParams(window.location.search);
    const account = params.get("account");
    return <ChabloomTable title="Bills" columns={columns} methods={["add", "edit", "delete"]} api={new BillsApi(account)} userManager={props.userManager} tenant={props.tenant}/>;
}
