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
        title: 'Due Date',
        accessor: "dueDate",
    },
]

const Bills: React.FC<Props> = (props) => {
    const baseUrl = `${ApplicationConfig.apiPublicAddress}/api/bills`;
    return (
        <ChabloomTable columns={columns} baseUrl={baseUrl}/>
    );
}

export default Bills;
