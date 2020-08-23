import React from "react";

import {UserManager} from "oidc-client";

import {AccountsApi} from "../api";
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
        title: 'Number',
        accessor: "externalId",
    },
    {
        title: 'Primary Address',
        accessor: "primaryAddress",
    },
]

export const Accounts: React.FC<Props> = (props) => {
    return <ChabloomTable title="Accounts" columns={columns} api={new AccountsApi()} userManager={props.userManager} tenant={props.tenant}/>;
}
