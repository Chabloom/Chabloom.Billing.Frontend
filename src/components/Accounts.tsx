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
        type: "text",
    },
    {
        title: 'Number',
        accessor: "externalId",
        type: "text",
    },
    {
        title: 'Primary Address',
        accessor: "primaryAddress",
        type: "text",
    },
]

export const Accounts: React.FC<Props> = (props) => {
    return <ChabloomTable title="Accounts" columns={columns} methods={["add", "edit", "delete"]} api={new AccountsApi()} userManager={props.userManager} tenant={props.tenant}/>;
}
