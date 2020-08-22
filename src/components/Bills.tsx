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
        title: 'Due Date',
        accessor: "dueDate",
    },
]

const Bills: React.FC = () => {
    const baseUrl = `${ApplicationConfig.apiPublicAddress}/api/bills`;
    return <ChabloomTable columns={columns} baseUrl={baseUrl}/>;
}

export default Bills;
