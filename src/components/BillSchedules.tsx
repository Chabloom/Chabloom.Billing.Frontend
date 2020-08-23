import React from "react";

import {UserManager} from "oidc-client";

import {BillSchedulesApi} from "../api";
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
        title: 'Amount',
        accessor: "amount",
    },
    {
        title: 'Day Due',
        accessor: "dayDue",
    },
    {
        title: 'Interval',
        accessor: "interval",
    },
]

export const BillSchedules: React.FC<Props> = (props) => {
    return <ChabloomTable title="Bill Schedules" columns={columns} api={new BillSchedulesApi()} userManager={props.userManager} tenant={props.tenant}/>;
}
