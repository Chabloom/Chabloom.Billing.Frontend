import React from "react";

import {ApplicationConfig} from "../settings";

import {ChabloomTable, ChabloomTableColumn} from "./ChabloomTable";

const columns: Array<ChabloomTableColumn> = [
    {
        title: 'Name',
        accessor: "name",
    },
    {
        title: 'Id',
        accessor: "externalId",
    },
    {
        title: 'Amount',
        accessor: "amount",
    },
]

const BillTransactions: React.FC = () => {
    const baseUrl = `${ApplicationConfig.apiPublicAddress}/api/billTransactions`;
    return <ChabloomTable columns={columns} baseUrl={baseUrl}/>;
}

export default BillTransactions;
