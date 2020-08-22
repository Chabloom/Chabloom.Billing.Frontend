import React from "react";

import {ApplicationConfig} from "../settings";

import {ChabloomTable, ChabloomTableColumn} from "./ChabloomTable";

const columns: Array<ChabloomTableColumn> = [
    {
        title: 'Name',
        accessor: "name",
    },
    {
        title: 'Number',
        accessor: "externalId",
    },
    {
        title: 'Primary Address',
        accessor: "primaryAddress",
    },
]

const Accounts: React.FC = () => {
    const baseUrl = `${ApplicationConfig.apiPublicAddress}/api/accounts`;
    return <ChabloomTable columns={columns} baseUrl={baseUrl}/>;
}

export default Accounts;
