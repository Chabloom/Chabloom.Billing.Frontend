import React from "react";

import {ApplicationConfig} from "../settings";

import {ChabloomTable, ChabloomTableColumn} from "./ChabloomTable";

const columns: Array<ChabloomTableColumn> = [
    {
        title: 'Name',
        accessor: "name",
    },
]

const Tenants: React.FC = () => {
    const baseUrl = `${ApplicationConfig.apiPublicAddress}/api/tenants`;
    return <ChabloomTable columns={columns} baseUrl={baseUrl}/>;
}

export default Tenants;
