import React from "react";

import { User } from "oidc-client";

import {
    AccountsApi,
    SchedulesApi,
    TenantViewModel,
} from "chabloom-payments-typescript";

import { AppConfig } from "../settings";

import { ChabloomTable, ChabloomTableColumn } from "./ChabloomTable";

interface Props {
    user: User | undefined;
    tenant: TenantViewModel | undefined;
}

const columns: Array<ChabloomTableColumn> = [
    {
        title: "Name",
        accessor: "name",
        type: "text",
    },
    {
        title: "Amount",
        accessor: "amount",
        type: "number",
    },
    {
        title: "Day Due",
        accessor: "dayDue",
        type: "number",
    },
    {
        title: "Interval",
        accessor: "interval",
        type: "number",
    },
];

// The API to use
let api: SchedulesApi = new SchedulesApi(AppConfig);

export const Schedules: React.FC<Props> = (props) => {
    let [title, setTitle] = React.useState("Schedules");

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
        if (props.tenant?.name && !account) {
            setTitle(`${props.tenant.name} Schedules`);
        } else if (account) {
            const accountsApi = new AccountsApi(AppConfig, props.tenant?.id);
            accountsApi
                .readItem(props.user?.access_token, account)
                .then((ret) => {
                    if (typeof ret !== "string") {
                        setTitle(`${ret.name} Schedules`);
                    } else {
                        setTitle("Schedules");
                    }
                });
        } else {
            setTitle("Schedules");
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
