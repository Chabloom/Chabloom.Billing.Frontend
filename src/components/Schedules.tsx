import React from "react";

import {UserManager} from "oidc-client";

import {SchedulesApi} from "../api";
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
        title: 'Day Due',
        accessor: "dayDue",
        type: "number",
    },
    {
        title: 'Interval',
        accessor: "interval",
        type: "number",
    },
]

// The API to use
let api: SchedulesApi = new SchedulesApi();

export const Schedules: React.FC<Props> = (props) => {
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
    return <ChabloomTable
        api={api}
        title="Schedules"
        columns={columns}
        methods={["add", "edit", "delete"]}
        userManager={props.userManager}
        tenant={props.tenant}/>;
}
