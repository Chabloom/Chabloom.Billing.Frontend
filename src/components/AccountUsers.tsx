import React from "react";

import { User } from "oidc-client";

import {
    AccountsApi,
    AccountUsersApi,
    TenantViewModel,
} from "chabloom-payments-typescript";

import { AppConfig } from "../settings/config";

import { ChabloomTable, ChabloomTableColumn } from "./ChabloomTable";

interface Props {
    user: User | undefined;
    tenant: TenantViewModel | undefined;
}

const columns: Array<ChabloomTableColumn> = [
    {
        title: "User Id",
        accessor: "userId",
        type: "text",
    },
    {
        title: "Account Name",
        accessor: "accountName",
        type: "text",
    },
    {
        title: "Account Id",
        accessor: "account",
        type: "text",
    },
    {
        title: "Role",
        accessor: "roleName",
        type: "text",
    },
];

// The API to use
let api: AccountUsersApi = new AccountUsersApi(AppConfig);

export const AccountUsers: React.FC<Props> = (props) => {
    let [title, setTitle] = React.useState("Account Users");

    const params = new URLSearchParams(window.location.search);
    const account = params.get("account");
    React.useEffect(() => {
        console.debug("updating api account");
        if (account) {
            api.account = account;
        } else {
            api.account = null;
        }
    }, [account]);
    React.useEffect(() => {
        console.debug("updating api tenant");
        if (props.tenant?.id) {
            api.tenant = props.tenant?.id;
        } else {
            api.tenant = null;
        }
    }, [props.tenant]);
    React.useEffect(() => {
        console.debug("updating table title");
        if (account) {
            const accountsApi = new AccountsApi(AppConfig, props.tenant?.id);
            accountsApi
                .readItem(props.user?.access_token, account)
                .then((ret) => {
                    if (typeof ret !== "string") {
                        setTitle(`${ret.name} Users`);
                    } else {
                        setTitle("Account Users");
                    }
                });
        } else {
            setTitle("Account Users");
        }
    }, [account, props.user, props.tenant]);
    return (
        <ChabloomTable
            {...props}
            api={api}
            title={title}
            columns={columns}
            methods={["add", "edit", "delete"]}
        />
    );
};
