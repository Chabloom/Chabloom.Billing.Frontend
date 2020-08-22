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
]

const Tenants: React.FC<Props> = (props) => {
    const baseUrl = `${ApplicationConfig.apiPublicAddress}/api/tenants`;
    return (
        <ChabloomTable columns={columns} baseUrl={baseUrl}/>
    );
}

export default Tenants;
