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

export const Transactions: React.FC<Props> = (props) => {
    return <ChabloomTable title="Transactions" columns={columns} methods={[]} api={new TransactionsApi()} userManager={props.userManager} tenant={props.tenant}/>;
}
