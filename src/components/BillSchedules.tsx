import React from "react";

import {UserManager} from "oidc-client";

import {ChabloomTable, ChabloomTableColumn} from "./ChabloomTable";
import {ApplicationConfig} from "../settings/config";

interface Props {
    userManager: UserManager,
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

const BillSchedules: React.FC<Props> = (props) => {
    const baseUrl = `${ApplicationConfig.apiPublicAddress}/api/billSchedules`;
    return (
        <ChabloomTable columns={columns} baseUrl={baseUrl}/>
    );
}

export default BillSchedules;
