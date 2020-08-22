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
        title: 'Id',
        accessor: "externalId",
    },
    {
        title: 'Amount',
        accessor: "amount",
    },
]

const BillTransactions: React.FC<Props> = (props) => {
    const baseUrl = `${ApplicationConfig.apiPublicAddress}/api/billTransactions`;
    return (
        <ChabloomTable columns={columns} baseUrl={baseUrl}/>
    );
}

export default BillTransactions;
