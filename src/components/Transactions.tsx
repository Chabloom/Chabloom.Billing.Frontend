import React from "react";

import {UserManager} from "oidc-client";

import {TransactionsApi} from "../api";
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
        title: 'Id',
        accessor: "externalId",
        type: "text",
    },
    {
        title: 'Amount',
        accessor: "amount",
        type: "number",
    },
]

export const Transactions: React.FC<Props> = props => {
    const params = new URLSearchParams(window.location.search);
    const account = params.get("account");
    return <ChabloomTable title="Transactions" columns={columns} methods={[]} api={new TransactionsApi(account)} userManager={props.userManager} tenant={props.tenant}/>;
}
