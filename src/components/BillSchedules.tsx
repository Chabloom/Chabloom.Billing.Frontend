import React from "react";

import {ApplicationConfig} from "../settings";

import {ChabloomTable, ChabloomTableColumn} from "./ChabloomTable";

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

const BillSchedules: React.FC = () => {
    const baseUrl = `${ApplicationConfig.apiPublicAddress}/api/billSchedules`;
    return <ChabloomTable columns={columns} baseUrl={baseUrl}/>;
}

export default BillSchedules;
