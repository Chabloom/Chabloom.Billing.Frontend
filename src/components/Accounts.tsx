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

// The API to use
let api: AccountsApi = new AccountsApi();

export const Accounts: React.FC<Props> = (props) => {
    React.useEffect(() => {
        console.debug("updating api tenant");
        if (props.tenant?.id) {
            api.tenant = props.tenant?.id;
        } else {
            api.tenant = null;
        }
    }, [props.tenant]);
    return <ChabloomTable
        api={api}
        title="Accounts"
        columns={columns}
        methods={["add", "edit", "delete", "bill", "schedule", "transaction"]}
        userManager={props.userManager}
        tenant={props.tenant}/>;
}
