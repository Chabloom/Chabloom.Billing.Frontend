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

export const Schedules: React.FC<Props> = props => {
    const params = new URLSearchParams(window.location.search);
    const account = params.get("account");
    return <ChabloomTable title="Schedules" columns={columns} methods={["add", "edit", "delete"]} api={new SchedulesApi(account)} userManager={props.userManager} tenant={props.tenant}/>;
}
